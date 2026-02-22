---
slug: getting-off-of-wyze-camv3
title: Almost Bricking a v3 Wyze Cam (and back again...)
authors: [njl]
tags: [homekit, wyze, scrypted, quartz, thingino, ingenic, cloner]
description: A personal account of flashing the custom Thingino firmware onto a Wyze Cam v3 to achieve local-only control and escape the cloud.
embedding_url: /embeddings/self-hosted-iot/getting-off-of-wyze-camv3.embedding.json
---

Wyze integrates and resells IoT cameras and devices for low capital cost, but they have been under increasing pressure to generate monthly recurring revenue. This shift has led to more aggressive cloud-only features and forced firmware updates.

<!-- truncate -->

- In addition, your data goes to the Wyze Cloud Infrastructure on AWS, where security incidents have happened—most notably the Feb 2024 event where users could inadvertently see into others' homes. I'm not judging, but if you value your privacy, it's time to take control of your hardware.
- I'm not opposed to paying for good software, but I'm already paying Apple and Google for their ecosystems. Do I really need to pay Wyze just to see my own front porch?
- [Scrypted](https://www.scrypted.app/) and [Frigate](https://frigate.video/) are excellent open-source options for private camera management, streaming over the local LAN via **ONVIF**.
- These tools work with the Wyze API, but Wyze's recent firmware changes have made local-only access increasingly difficult, forcing my hand to replace the firmware entirely.

## NAT at the Router, Fool (didn't work... why?)

Initially, I tried to block Wyze's cloud heartbeats at the firewall level. This failed because the stock Wyze firmware is designed to "fail closed" or enter a reboot loop if it cannot reach its AWS-based authentication servers. The only way to truly own the hardware is a complete firmware replacement.

### The Thingino Adventure

Flashing the [Thingino](https://thingino.com/) firmware onto a Wyze Cam v3 is not for the faint of heart. The device uses an **Ingenic T31** processor, and the "almost bricking" experience happened while using the [Ingenic USB Cloner](https://github.com/themactep/thingino-firmware/wiki/Ingenic-USB-Cloner) tool.

If you don't get the driver and the "vibe" of the bootloader sequence just right, the device remains in a dead state. It took three attempts and a dedicated Windows VM to finally get the firmware to take. But once it did? Total local control, no cloud heartbeats, and a beautiful RTSP stream directly into Scrypted.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
