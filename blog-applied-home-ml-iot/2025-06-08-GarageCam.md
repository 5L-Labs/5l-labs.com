---
slug: garage-cam-on-the-cheap
title: Adventures in CheapML - GarageCam
authors: [njl]
tags: [homekit, wyze, scrypted, quartz, xterm, cloner]
description: A DIY approach to garage door and car presence detection using a Wyze Cam v3, Thingino, and a custom Python script for cheap ML at the edge.
embedding_url: /embeddings/applied-home-ml-iot/garage-cam-on-the-cheap.embedding.json
---

With [Scrypted](https://www.scrypted.app/) / [Thingino](https://thingino.com/) up and stable, the next goal is to replace my janky garage door sensor with a camera-based sensor. With some luck, I can extend this to every camera in the house cheaper and more accurately than Frigate, but let's not get ahead of ourselves.

<!-- truncate -->

1. What I have:
   - Wyze Cam v3
   - Scrypted
   - Thingino
   - HomeKit
   - RPi 4 that isn't melting

2. What I need:
    - A way to detect when the garage door is open or closed
    - A way to update MQTT with the state of the garage door
    - A way to update MQTT with the state of the car


So far:
  The initial Python script I "vibe coded" was, to put it mildly, very hacky. It used the [ONVIF Snapshot protocol](https://www.onvif.org/) to capture a frame every 60 seconds from the camera. While it technically worked with `opencv-python` and `paho-mqtt` for a few days, it was brittle and prone to memory leaks on the RPi 4.

  The real lesson here was in the data handling—capturing snapshots is easy, but making a reliable sensor out of them required a more robust architecture. This prototype was eventually rewritten to use a more stable event-driven model, which I'll cover in the follow-up post.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
