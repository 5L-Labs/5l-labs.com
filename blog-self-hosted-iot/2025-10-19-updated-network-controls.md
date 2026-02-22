---
slug: updated-network-controls
title: Overlord - Home Network Kill Switch
authors: [njl]
tags: [homekit, homebridge, pihole, ubiquiti, network, kill-switch, fastapi, podman]
description: Updates on the Overlord Network Kill Switch project, supporting Pi-hole v6 and Ubiquiti 9.4.19 for simple, one-tap parental controls in HomeKit.
embedding_url: /embeddings/self-hosted-iot/updated-network-controls.embedding.json
---

## For exactly zero-users (or maybe just me and my family),

<!-- truncate -->

I've spent some time firming up the **Overlord** Home Network Kill Switch project due to some breaking changes in Pi-hole v6 and Ubiquiti Control 9.4.19. It’s a home project that uses iOS HomeKit buttons, backed by a Ubiquiti and Pi-hole setup, to simplify parental controls. I suspect others might appreciate a one-tap solution for managing network access, especially one that's easy enough for less technical family members to use.

## Why I Built This

The UniFi app is powerful, but I found it took too many clicks to quickly block the internet or specific services like YouTube. This project creates simple "on/off" switches in Apple HomeKit, saving me from needing to open the app or connect to a VPN for simple tasks. For those using Home Assistant, integration should also be straightforward.

## What It Does

I built a small **FastAPI** application that works with HomeKit (via MQTT and Node-RED) to:

* Enable or disable predefined firewall rules on your Ubiquiti network.
* Block or unblock specific devices by their MAC address.
* Allow non-technical users to create schedules and automations for these actions directly in the Home app.

## Where to Get It

You can find all the specifics on the GitHub repo:
[https://github.com/5L-Labs/overlord-network-kill-switch](https://github.com/5L-Labs/overlord-network-kill-switch)

To get started quickly with **Podman**:
```bash
podman run -d --replace --name=overlord-dns -p 19000:19000 --env-file=./etc/envfile ghcr.io/5l-labs/overlord-network-kill-switch:2.5
```

## What was hard about this?
Testing, testing, testing. Time management was also a challenge—this took far longer than planned for the limited time I had.

* Not DOSing the Ubiquiti Controller while trying to validate code paths.
* Ensuring Pi-hole v6 API calls were working as expected.
* Adding in edge-case/race-condition checks.
* Making it proper, releasable code that someone else might actually use.

## Did AI Help?
No, not really. It did some scaffolding and documentation, but the core logic was still human-led. I am currently using [Jules](https://jules.google.com/session) to keep ripping out dead code paths and maintain the FastAPI backend, which has significantly lowered the "toil" of this side project.

## Recent Changes

* **Pi-hole v6 API Integration**: The project now uses the new `pihole6api` library to interact with the Pi-hole v6 API. This allows for more reliable and efficient management of blocklists.
* **Ubiquiti Control 9.4.19 Support**: The project has been updated to support the latest version of Ubiquiti Control.

## How It Works (The "Background")

I use the firewall rules on my Ubiquiti gear to enforce blocks on devices (like school-issued laptops) that are configured to bypass my local Pi-hole DNS. This setup allows for creating network-level blocks for common services, providing a more robust solution for locked-down devices. It was a fun project, and it gives my family an easier way to manage internet access as my kids get older.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
