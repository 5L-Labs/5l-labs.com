---
slug: trixie-wireguard-forwarding-regression
title: Raspberry Pi OS Trixie, WireGuard, and a Very Specific TCP Forwarding Failure
authors: [njl]
tags: [raspberry-pi, debian, trixie, bookworm, wireguard, networking, tcp, routing]
description: Notes from reproducing a Raspberry Pi OS Trixie TCP forwarding failure through WireGuard where ICMP works, TCP SYN-ACKs leave the gateway, and the client never completes the handshake.
embedding_url: /embeddings/self-hosted-iot/trixie-wireguard-forwarding-regression.embedding.json
---

I am writing this down while it is still raw because it is the kind of network bug people do not believe until there are packet captures.

Short version: a Raspberry Pi acting as a WireGuard IPv4 forwarder works on Bookworm, but a Trixie build with a Raspberry Pi 6.18 kernel fails for TCP in a very specific asymmetric LAN routing path. ICMP still works.

<!-- truncate -->

## Topology

The intended path:

```text
192.168.3.42 client
  -> 192.168.3.1 LAN router
  -> 192.168.3.105 Raspberry Pi forwarder
  -> WireGuard
  -> 192.168.100.10 remote TCP host
```

The return path from the Pi is naturally direct, because the client is on-link:

```text
192.168.100.10
  -> WireGuard
  -> 192.168.3.105 Raspberry Pi forwarder
  -> 192.168.3.42 client MAC directly
```

That asymmetry is not ideal, but it has worked for a long time on Bookworm.

## Reproducer Matrix

```text
192.168.3.101
  Raspberry Pi 4
  Debian Bookworm
  6.12.34+rpt-rpi-v8
  bcmgenet
  works

192.168.3.105
  Raspberry Pi 4
  Debian Trixie
  6.18.39+rpt-rpi-v8
  bcmgenet
  fails

192.168.3.100
  Raspberry Pi 5
  Debian Trixie
  6.18.34+rpt-rpi-2712
  macb
  also failed earlier
```

The important one is `.105`: same Pi 4 hardware class and same `bcmgenet` driver as the working Bookworm node, but Trixie / Raspberry Pi kernel 6.18.

## The Packet Shape

On the failing Trixie Pi 4, tcpdump shows:

```text
router MAC -> Pi MAC
192.168.3.42:ephemeral -> 192.168.100.10:22 SYN

Pi MAC -> client MAC
192.168.100.10:22 -> 192.168.3.42:ephemeral SYN-ACK

Pi MAC -> client MAC
192.168.100.10:22 -> 192.168.3.42:ephemeral SYN-ACK retransmit
```

The normal client ACK does not come back before timeout.

The same failure reproduced on multiple TCP protocols, not just SSH. SSH is just the easiest way to generate a clean TCP test.

## What Does Work

A client-side static route directly to the Pi makes TCP work:

```sh
sudo route add -host 192.168.100.10 192.168.3.105
route get 192.168.100.10
```

The key is that `route get` must show:

```text
gateway: 192.168.3.105
```

When the client sends directly to the Pi, the TCP flow completes.

## Things We Ruled Out

`rp_filter` was set to `0` on `all`, `default`, `eth0`, and `wg1`.

NAT was removed and was not the reason Bookworm worked.

Disabling SSH `IPQoS` did not help.

Disabling TX checksum, TSO, GSO, and GRO on the Pi 5 did not help.

Disabling EEE on the Trixie Pi 4 did not help.

Moving the client from Wi-Fi to wired did not help.

Moving the Pi to another network port did not help.

## Current Suspicion

This now looks like a Raspberry Pi kernel 6.18 forwarding or Ethernet interaction exposed by same-LAN asymmetric return traffic.

The next test is to flash the Trixie Pi 4 down to a 6.12 kernel and repeat the same router-first test. If that works, the bug is very likely in the Raspberry Pi kernel jump from 6.12 to 6.18 rather than in WireGuard or local configuration.

