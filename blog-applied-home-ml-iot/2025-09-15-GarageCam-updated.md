---
slug: continued-iot-ml-on-the-cheap
title: Continued Adventures in CheapML for IoT
authors: [njl]
tags: [homekit, wyze, scripted, quartz, xterm and cloner]
---

I have probably bit off more than I can chew with this project.

## What is hard (or time consuming) about this?

*  Generating the testing/training data set. I ended up using a VLM to do the initial labelling, with manual overrides possible
*  As I'm trying to run this with limited resources on a  (RPI 4 with 4GB RAM) that means starting the ML models from scratch.
*  Trying to leave something that is generalizable enough for other cameras in the house - or just give up and pay the $20/mo for Frigate/Scrypted Cloud.

### New Things
* PyTorch -> ONNX -> TFLite -> Latest
