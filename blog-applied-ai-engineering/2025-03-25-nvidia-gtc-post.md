---
slug: nvdia-gtc-recap
title: NVIDIA GTC Recap
authors: [njl]
tags: [blog, nvidia, ai, gpu, deep-learning, machine-learning]
---

# What a week at NVIDIA GTC 2025! 󰻠
Lots of new information to assimilate, this first-of-many post focuses on private agency related thoughts including putting the puzzle together for Private Agency for My House.

Soumith Chintala

## Ingredients to the bake Private Agency in the home?

Ignorance is dangerous, so let's take a look at what are the known-knowns, known-unknowns, and unknown-unknowns.

<!-- truncate -->

### Inference

Generalized Local-Language including Specialized Language Mode
  - Likely a mixture of experts working together in my house - at it's most extreme form, it's one-per tool (but this is an overoptimization)

### Training

Federated Learning Participation for Local Retraining of Data
  - Where is that data stored and in what format(s)?

### Verification
How do we validate data is not being leaked via imported models?

### Data Tagging by Sensitivity:

### Interoperability

Embeddings are model specific, what does a transformation space between embeddings look like? Can an open standard be created (or base embedding features) to allow transformation between embeddings?

## Open major questions
1. In addition to RL/SFT/Lora/FP Quantitzatio for inference, does anyone see a future without private retraining of models on a regular basis?
- On Hardware:
  - What are the chances of data mixing in a RDMA GPU Mesh/ what does a GPU Enclave look like?
  - Private Enclaves exist for Motherboard HBM, Disk and CPU, and [H100](https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/)
1. Can the performance impact of segregation at scale become cheap enough to offset the need for local high-end hardware?
1. Adding factual knowledge to a LLM (and surpressing old knowledge) at scale?
1. How can we move embeddings from one model to another model at scale?
1. If the Data Center (née AI Factory) is moving to 600kva Racks, and 6 Mega-Watt hubs, what does the edge look like?




## Testing Private Agency


### Detailed Links Training
Hints:
 1. https://developer.nvidia.com/gpudirect
 2. https://github.com/facebookincubator/gloo
 3. https://github.com/horovod/horovod
 4. https://security.apple.com/blog/private-cloud-compute/
 5. https://www.microsoft.com/en-us/research/blog/secure-training-of-machine-learning-models-on-azure/
 6. [H100](https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/)

 # Players in this space?

### Hosting -
1. https://www.atlantic.net/gpu-server-hosting/hipaa-gpu-hosting/

<!--
 Distributed Training
 Private LLMs

-->
