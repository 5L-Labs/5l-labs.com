---
slug: continued-iot-ml-on-the-cheap
title: Continued Adventures in CheapML for IoT
authors: [njl]
tags: [homekit, wyze, scrypted, quartz, xterm, cloner, pytorch, onnx, tflite]
description: A progress update on the GarageCam project, focusing on VLM labeling (Qwen), model conversion (PyTorch to TFLite), and the challenges of running ML on an RPi 4.
embedding_url: /embeddings/applied-home-ml-iot/continued-iot-ml-on-the-cheap.embedding.json
---

I have probably bit off more than I can chew with this project. However, the progress made on automated labeling and model conversion has been a game-changer for my local-first AI experiments.

<!-- truncate -->

## What is hard (or time-consuming) about this?

*  Generating the testing/training data set. I ended up using a VLM for the initial labeling, with manual overrides for edge cases. I started with Moondream, but eventually transitioned to **Qwen2-VL**, which proved far more robust for object identification. In retrospect, we also should have tried out **Molmo** instead of LLaVA for its superior zero-shot performance on high-resolution snapshots.
*  As I'm trying to run this with limited resources on a Raspberry Pi 4 (4GB RAM), that means starting the ML models from scratch and aggressive pruning/quantization.
*  Trying to leave something that is generalizable enough for other cameras in the house—or just give up and pay the $20/mo for Frigate/Scrypted Cloud. The goal of "CheapML" is to see how far we can get with pure open-source and local hardware.

### The Conversion Pipeline
The current pipeline takes a PyTorch-trained model, converts it to **ONNX** for optimization, and then finally to **TFLite** to squeeze it onto the RPi 4's CPU/TPU. Each step requires careful calibration to avoid significant accuracy loss during quantization.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
