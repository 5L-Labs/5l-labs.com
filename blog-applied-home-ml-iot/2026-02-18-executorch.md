---
slug: executorch-bootstrap
title: GarageCam Lives! ExecuTorch on RPi 5
authors: [njl]
tags: [vllm-sr, semantic-router, privateai, executorch, raspberry-pi-5, mqtt, scrypted, thingino]
description: A deep dive into deploying a private ML pipeline for GarageCam using ExecuTorch on Raspberry Pi 5, featuring real-time inference and MQTT integration.
embedding_url: /embeddings/applied-home-ml-iot/executorch-bootstrap.embedding.json
---

Due to competing priorities, getting the first "baby" model out the door on **ExecuTorch** took far longer than anticipated. 

## What does the model do? 
The model monitors a webcam powered by [Thingino](https://thingino.com/) and served to HomeKit via [Scrypted](https://www.scrypted.app/). It produces two primary predictions published to MQTT, which are then exported to HomeKit via [Homebridge](https://homebridge.io/) using [mqtt-things](https://github.com/arachnetech/homebridge-mqttthing):
- Door Open/Closed
- Car Home/Away

<!-- truncate -->

Please see the previous post on [GarageCam](./2025-09-15-GarageCam-updated.md) for context on the evolution of this project.

![](./static/garagecam-20250608_195709.jpeg)

## How does it run?

- **Raspberry Pi 5** - set to poll every 30s.
- **Raspberry Pi 4** - Currently sidelined due to a build mismatch. 

The underlying code maps PyTorch operations to specific CPU sets via ExecuTorch, but this process is currently error-prone. Aligning the right instruction sets with the target architecture requires precise configuration, which led to the RPi 4 hiccups.

<div style={{fontSize: '0.8em'}}>

```python
2026-02-18 06:01:42,406 [INFO] model_runner.inference: Loading PTE model from /app/model/model.pte
[program.cpp:153] InternalConsistency verification requested but not available
[cpuinfo_utils.cpp:71] Reading file /sys/devices/soc0/image_version
[cpuinfo_utils.cpp:87] Failed to open midr file /sys/devices/soc0/image_version
[cpuinfo_utils.cpp:100] Reading file /sys/devices/system/cpu/cpu0/regs/identification/midr_el1
[cpuinfo_utils.cpp:100] Reading file /sys/devices/system/cpu/cpu1/regs/identification/midr_el1
[cpuinfo_utils.cpp:100] Reading file /sys/devices/system/cpu/cpu2/regs/identification/midr_el1
[cpuinfo_utils.cpp:100] Reading file /sys/devices/system/cpu/cpu3/regs/identification/midr_el1
2026-02-18 06:01:42,408 [INFO] model_runner.inference: PTE model loaded successfully
2026-02-18 06:01:42,408 [INFO] model_runner.mqtt_client: Connecting to MQTT broker mqtt_broker:1883
2026-02-18 06:01:42,412 [INFO] model_runner.mqtt_client: Connected to MQTT broker
2026-02-18 06:01:42,512 [INFO] model_runner.healthcheck: Healthcheck server listening on port 8080
2026-02-18 06:01:42,613 [INFO] model_runner.runner: All components initialized successfully
2026-02-18 06:01:42,613 [INFO] model_runner.runner: Running inference every 10.0s
2026-02-18 06:01:43,281 [INFO] model_runner.camera: ONVIF snapshot URI: http://192.168.000.000/image.jpg
2026-02-18 06:01:44,311 [INFO] model_runner.runner: Debug snapshot saved: /tmp/model_runner_debug/snapshot_20260218_060144.jpg
2026-02-18 06:01:44,326 [INFO] model_runner.state: State change: car_present: UNKNOWN -> OFF (prob=0.198)
2026-02-18 06:01:44,326 [INFO] model_runner.state: State change: door_open: UNKNOWN -> OFF (prob=0.000)
2026-02-18 06:01:44,326 [INFO] model_runner.state: State change: door_closed: UNKNOWN -> ON (prob=0.801)

```

</div>

## How does it perform?

Surprisingly well! The Raspberry Pi 5 handles the inference load with ease, maintaining a consistent polling interval without thermal or resource issues.

### How efficient is it?

- **Model Size:** Optimized for edge deployment using PTE formats.
- **CPU Consumed:** Minimal impact on the Pi 5's quad-core processor.
- **Memory Consumed:** Low footprint, leaving plenty of headroom for other services.

![](./static/rpi5_perf.jpg)

While the resource usage is excellent, I'm still refining the observability stack to better track long-term ML accuracy and model drift.

## Does this help avoid [Frigate](https://frigate.video/) / [Scrypted NVR](https://docs.scrypted.app/scrypted-nvr/) fees?

Nope, you should still pay them. Eventually, my answer may change, but not without more observability work and scaling this across more cameras. 

## Where is the code?

Next Time—it's not presentable to the public (yet) largely as there is still a lot of hard-coded stuff with PII that I want to remove. 

### ExecuTorch and the CompileVM

Rather than bloat my main workstation with cross-compilation support, I've added a QEMU/UTM Debian VM for compiling the Python wheels for ExecuTorch. This will be factored out of the main repo as a more generic solution.

* **Note**: I have a compile container as well, but in principle, I could have run this on an x86 box so it wasn't a generic cross-compile/arch-agnostic pipeline.

### Did [PyTorch Lightning](https://lightning.ai/pytorch-lightning) help?

Tremendously versus straight PyTorch. At some point, I need to dig into what is going on under the hood. 

### Did AI Assist with the coding / testing / design?

Yes. It was used for boilerplate and autocomplete. Sadly, as some of the tech ([ExecuTorch](https://pytorch.org/executorch/), [ONNX](https://onnx.ai/), [TFLite](https://www.tensorflow.org/lite)), [Daytona](https://daytona.io/), BaseTen, and [Modal](https://modal.com/) was not familiar to me, Gemini, Claude (Opus), and Grok helpfully jumped in to help—but the subtle bugs hurt, a lot.

## How does this really help?

I've done nothing special here—but it opens the door to a generic home-ML pipeline of using bigger "Teacher" models to train smaller "Student" models that can run on non-specialized hardware. 

```mermaid
flowchart TD
    Cam["Camera (Thingino/Scrypted)"] <--> WS["Data Pipeline"]
    
    subgraph Local_Process [Local Processing]
        WS -->|2. Classify & Annotate| Qwen["Local Teacher (Qwen3-VL)"]
        Qwen --> WS
        WS -->|3. Verify Data| Verify[Data Verification]
    end
    
    Verify --> Train{Training Options}
    
    subgraph Training_Env [4. Training Environment]
        Train -->|Local| Metal[Metal]
        Train -->|Local| Halo[AMD Strix Halo]
        Train -->|Remote| Modal["Modal (NVIDIA)"]
        Train -->|Remote| Daytona["Daytona (NVIDIA)"]
        Train -->|Remote| BaseTen["BaseTen (NVIDIA)"]
    end
    
    Metal --> Trained[5. Trained Model]
    Halo --> Trained
    Modal --> Trained
    Daytona --> Trained
    BaseTen --> Trained
    
    Trained --> Export[ 6. Export ExecuTorch / ONNX]
    Export --> Build[7. Build Container Image]
    Build --> Edge["8. Edge Device (RPi)"]
```

## Next Steps for GarageCam
- **Model Perf Tracking**: Need to add in [Arize Phoenix](https://phoenix.arize.com/) or [Sentry](https://sentry.io/) for tracking model drift and inference performance.
- **Model Architecture**: See the next post in the Frontier Research blog where I may reveal my ignorance.
- **Model Inference Footprint**: Fix the RPi 4 and explore other smaller processors.
- **Data Privacy**: Add in bounding, labeling, and masking of private data with the local Teacher. Once properly masked, Daytona/Modal/BaseTen/Lightning are excellent for beefy training.
- **Differential Privacy**: Exploring how much noise can be added to the picture without breaking the classifier.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
