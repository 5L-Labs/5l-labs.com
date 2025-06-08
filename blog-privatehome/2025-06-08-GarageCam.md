---
slug: garage-cam-on-the-cheap
title: Adventures in CheapML
authors: [njl]
tags: [homekit, wyze, scripted, quartz, xterm and cloner]
---

With Scrypted / Thingino up and stable, the next goal is to replace my janky garage door sensor with a camera-based sensor. With some luck, I can extend this to every camera in the house cheaper and more accurately than Frigate, but let's not get ahead of ourselves.

1. What I have:
   - Wyze Cam v3
   - Scrypted
   - Thingino
   - HomeKit
   - RPI 4 that isn't melting

2. What I need:
    - A way to detect when the garage door is open or closed
    - A way to update MQTT with the state of the garage door
    - A way to update MQTT with the state of the car


So far:
  I've vibe coded up a script to use OVNIF Snapshot protocol to take a snapshot of the camera every 60 seconds.
