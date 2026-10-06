---
slug: rootless-podman-bluetooth
title: Start Faster - Home Assistant with Podman on a Raspberry Pi using SD Card
authors: [njl]
tags: [home-assistant, bluetooth, podman, rootless, quadlet, dbus, bluez, debian]
description: Home Assistant is a big container - running it with overlay-vfs to get bluetooth working is life draining. Now, we can skip that step and use Home Assistant's Bluetooth integration in a rootless Podman container with a D-Bus auth proxy.
---
:::danger
A year or two ago, I would have gotten stuck wading into the politics of DBUS - fixed the thing that needed fixing - and moved on (clearing short term memory). Now I can have my helper do that, and still retain nothing in memory.  Perhaps I'll have forgotten where I am soon.

:::

Running Home Assistant in a rootless Podman container on a SD Card is a miserable slog when you try to use Bluetooth. `--userns=keep-id` will require a chown on every file to boot the container - madness on a SD Card (can be upwards of 20 minutes or more on first boot). Failure to do this correctly earns you the error:

```txt
DBus authentication error; make sure the DBus socket is available and the user has the correct permissions: authentication failed: REJECTED: ['EXTERNAL']
```

Rather than code up a side-car, I found [yichenshen/dbus-auth-proxy](https://github.com/yichenshen/dbus-auth-proxy) (our patched version: [5L-Labs/dbus-auth-proxy](https://github.com/5L-Labs/dbus-auth-proxy)), a small subuid->uid dbus auth proxy someone wrote that can be chained to the standard dbus proxy (which apparently no one wants to touch with a barge pole).

AI has assisted the detailed write-up. Thanks to [Shen Yichen](https://github.com/yichenshen) for the original code, which I asked my assistant for some bugfixes / made work with quadlets.

<!-- truncate -->

## Why D-Bus rejects the container

D-Bus clients authenticate with `AUTH EXTERNAL <uid>`: the client says which user it is, and the bus checks that against the kernel's view of who opened the socket. Inside a rootless container, Home Assistant runs as `root` (UID 0). Outside, the kernel sees your unprivileged host user. The UIDs don't match, so the bus says `REJECTED`.

The textbook fix is `--userns=keep-id`, which maps your host UID into the container. As described above, that means a `chown` of every file in the image on first boot, which on an SD card is a non-starter.

## dbus-auth-proxy

[yichenshen/dbus-auth-proxy](https://github.com/yichenshen/dbus-auth-proxy) solves this neatly. It runs in its own small container as your user (with `keep-id`, which is cheap for a tiny Python image) and:

1. Creates a socket that looks like the system bus, in a named volume (`dbus-socket`)
2. Checks that each connecting client is the same user as the proxy
3. Rewrites the UID in `AUTH EXTERNAL` to its own, then connects to the real system bus and forwards traffic both ways

Home Assistant mounts that volume in place of `/run/dbus`:

```bash
podman run -v dbus-socket:/run/dbus:rw ...
```

Credit to Shen Yichen for the original. It got basic D-Bus working right away.

## The hang: file descriptors over D-Bus

This showed up on every Raspberry Pi I run (three, in three buildings): basic Bluetooth worked, but some devices didn't. The calls that hung were BlueZ's `AcquireWrite` and `AcquireNotify`. bleak (the BLE library under Home Assistant) uses them to find the connection's MTU, and optionally for notifications. Both return a **file descriptor** instead of data.

D-Bus passes file descriptors as `SCM_RIGHTS` ancillary data on the Unix socket. The original proxy uses asyncio streams, which only ever call `recv`, so the ancillary data is silently dropped. It still passed the client's `NEGOTIATE_UNIX_FD` through, so the bus agreed to send fds. The client then got a message that said "here's an fd" with no fd attached, and hung or errored.

<details>
<summary>Why a simple byte pump isn't enough</summary>

The obvious fix is to swap `recv`/`send` for `recvmsg`/`sendmsg` and forward the fds along with the bytes. That has a subtle problem. A Unix stream socket has no message boundaries, and the kernel attaches fds to a specific byte. If the proxy falls behind, a single read can return the end of message N, the start of message N+1, *and N+1's fds*. Forward that chunk as-is and the fds now arrive attached to message N. sd-bus rejects that with `EBADMSG`; other clients misassign them. And it only happens under load, like a burst of BLE notifications.

The fix is to frame messages:

- During auth, read byte by byte so nothing past the handshake is consumed
- After `BEGIN`, read exactly the 16-byte fixed header, compute the message length from it, read exactly that many bytes, then forward the whole message with its fds on the first byte
- Close the received fds once forwarded, so each `Acquire*` doesn't leak one

That's a few hundred lines of Python instead of ten, but each piece is needed.

</details>

<details>
<summary>Quadlet: build it locally</summary>

Quadlets are the current hotness, and all the home-iot stuff was ported to quadlets over the last few months (they are growing on me).

The original quadlet pulls `ghcr.io/yichenshen/dbus-auth-proxy:latest` with `AutoUpdate=registry`. For something that sits between my containers and the system bus, I'd rather run code from a checkout I've read. The [5L-Labs fork](https://github.com/5L-Labs/dbus-auth-proxy) builds the image locally with a quadlet `.build` unit (podman 5.2+):

```bash
git clone https://github.com/5L-Labs/dbus-auth-proxy.git
cd dbus-auth-proxy
./quadlet/install.sh
systemctl --user start dbus-auth-proxy
```

To update:

```bash
git pull
systemctl --user restart dbus-auth-proxy-build dbus-auth-proxy
```

It also exits cleanly on `SIGTERM`. As PID 1 in a container, Python has no default handler, so `podman stop` used to wait 10 seconds and then `SIGKILL` it.

</details>

## Optional: only allow BlueZ

The proxy forwards everything your user can reach on the system bus. To narrow that, chain [xdg-dbus-proxy](https://github.com/flatpak/xdg-dbus-proxy) behind it with `--filter --talk=org.bluez`. The fork's README has the systemd unit and quadlet drop-in.

## Caveats

- Rootless containers can't use `NET_ADMIN`/`NET_RAW` on the host, so Home Assistant's Bluetooth runs in degraded mode (no automatic adapter recovery). If the adapter is blocked by rfkill, unblock it on the host: `sudo rfkill unblock bluetooth`.
- On SELinux hosts, Home Assistant also needs `--security-opt label=disable` to use the proxy's socket, which turns off SELinux separation for that container.

## Where it stands

- Fork with the fixes: [5L-Labs/dbus-auth-proxy](https://github.com/5L-Labs/dbus-auth-proxy), tested end-to-end with Home Assistant Bluetooth
- Original: [yichenshen/dbus-auth-proxy](https://github.com/yichenshen/dbus-auth-proxy), with an open issue to upstream the changes: [#4](https://github.com/yichenshen/dbus-auth-proxy/issues/4)
- Home Assistant docs: [home-assistant.io#48807](https://github.com/home-assistant/home-assistant.io/pull/48807) adds a "Rootless Podman" section to the Bluetooth integration page
