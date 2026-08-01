---
slug: trixie-is-trixie
title: Trixie is Trixie! How my VPN forwarder stopped working.
authors: [njl]
tags: [raspberry-pi, debian, trixie, bookworm, wireguard, networking, tcp, routing]
description: Upgrading from Bookworm to Debian Trixie should be easy...
embedding_url: /embeddings/self-hosted-iot/trixie-is-trixie.embedding.json
---


I usually under-estimate how long it will take to "Maintain" my extended home network. Six hours later and an AI Assist later, I have a workaround but not a super awesome understanding of what got strict between Kernel 6.12 and 6.18. I wrote this up briefly so others might find it on Google.

As a reminder, we had one Bookworm Raspberry Pi acting as a WireGuard IPv4 forwarder sending traffic across the planet. After upgrading to Trixie, tcp connectivity stopped working but ping went through. None of the usual suspects helped - AI was generally useless.

So what the heck changed?

<!-- truncate -->

It turns out tolerance for asymmetry changed - exactly what I don't know. I've now got a PR to my wireguard scripts to add src-based routing on the Raspberry Pi VPN gateway for every route that has a static route on the local router.

## Was AI completely useless?

No. Once we got going, AI was very good at coordinating test harnesses / collecting evidence / writing up the below technical snapshots. It sent us down a few rabbit holes of research that were complete B.S., but I emerged with a better understanding of L3/L2 networks in a non-enterprise setting. It also helped me get my thoughts together into a clever Google search that pulled us back onto the right path.

### What I wish I had done at the start?

As it was 02:00 AM, probably agreed to just leave things broken (and ignore the pages going off that the VPN was down...).

### Why don't you have a full RCA?

Time. At some point the direct path gets cached and things normalize. The static route is a shim. I want to verify this behaviour back in the US on another network segment to make sure the Buffalo router wasn't a contributing factor.

## Topology

The intended path:

```text
10.77.3.42 client
  -> 10.77.3.1 LAN router
  -> 10.77.3.105 Raspberry Pi forwarder
  -> WireGuard
  -> 10.88.100.10 remote TCP host
```

The return path from the Pi is naturally direct, because the client is on-link:

```text
10.88.100.10
  -> WireGuard
  -> 10.77.3.105 Raspberry Pi forwarder
  -> 10.77.3.42 client MAC directly
```

That asymmetry is not ideal, but it has worked for a long time on Bookworm.

## Reproducer Matrix

```text
10.77.3.101
  Raspberry Pi 4
  Debian Bookworm
  6.12.34+rpt-rpi-v8
  bcmgenet
  works

10.77.3.105
  Raspberry Pi 4
  Debian Trixie
  6.18.39+rpt-rpi-v8
  bcmgenet
  fails

10.77.3.100
  Raspberry Pi 5
  Debian Trixie
  6.18.34+rpt-rpi-2712
  macb
  also failed earlier
```

The important one is the Trixie Pi 4: same Pi 4 hardware class and same `bcmgenet` driver as the working Bookworm node, but Trixie / Raspberry Pi kernel 6.18.

## The Packet Shape

On the failing Trixie Pi 4, tcpdump shows:

```text
router MAC -> Pi MAC
10.77.3.42:ephemeral -> 10.88.100.10:22 SYN

Pi MAC -> client MAC
10.88.100.10:22 -> 10.77.3.42:ephemeral SYN-ACK

Pi MAC -> client MAC
10.88.100.10:22 -> 10.77.3.42:ephemeral SYN-ACK retransmit
```

The normal client ACK does not come back before timeout.

The same failure reproduced on multiple TCP protocols, not just SSH. SSH is just the easiest way to generate a clean TCP test.

## Client-side Static Routes

A client-side static route directly to the Pi proves the problem:

```sh
sudo route add -host 10.88.100.10 10.77.3.105
route get 10.88.100.10
```

The key is that `route get` must show:

```text
gateway: 10.77.3.105
```

When the client sends directly to the Pi, the TCP flow completes.

That is not a scalable fix. The cleaner gateway-side workaround is source-policy routing on the Pi. For every remote LAN in the WireGuard peer's `AllowedIPs`, route packets sourced from that remote LAN back to the local router instead of letting the Pi send them directly to the local client MAC.

Example:

```sh
sudo ip route replace default via 10.77.3.1 dev eth0 src 10.77.3.105 table 100

sudo ip rule add from 10.88.100.0/24 table 100 priority 1000
sudo ip rule add from 10.88.20.0/24 table 100 priority 1001
sudo ip rule add from 10.88.4.0/24 table 100 priority 1002
sudo ip rule add from 10.88.5.0/24 table 100 priority 1003

sudo ip route flush cache
```

Then verify the return leg:

```sh
ip route get 10.77.3.42 from 10.88.100.10 iif wg1
```

The desired result is:

```text
10.77.3.42 from 10.88.100.10 via 10.77.3.1 dev eth0 table 100
```

This keeps the original remote source IPs, avoids NAT, and removes the asymmetric L2 return path.

In Ansible terms, the sustainable rule is:

```text
for each remote LAN subnet in WireGuard AllowedIPs:
  add "ip rule from <remote-lan-subnet> lookup 100"

table 100:
  default via <local-lan-router> dev <lan-interface> src <pi-lan-ip>
```

I would include actual routed LAN prefixes such as `10.88.100.0/24`, `10.88.20.0/24`, `10.88.4.0/24`, and `10.88.5.0/24`. I would not include WireGuard tunnel endpoint `/32`s unless those addresses are actually used as source addresses for routed client traffic.

### False Leads (Before we knew )

* `rp_filter` was set to `0` on `all`, `default`, `eth0`, and `wg1`.
* NAT was removed and was not the reason Bookworm worked.
* Disabling SSH `IPQoS` did not help.
* Disabling TX checksum, TSO, GSO, and GRO on the Pi 5 did not help.
* Disabling EEE on the Trixie Pi 4 did not help.
  * This was all ruled out once I flashed an RPI 4 to 6.18.
* Moving the client from Wi-Fi to wired did not help.
* Moving the Pi to another router port did not help.
