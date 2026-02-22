---
slug: nvdia-gtc-recap
title: NVIDIA GTC Recap
authors: [njl]
tags: [blog, nvidia, ai, gpu, deep-learning, machine-learning]
description: A recap of NVIDIA GTC 2025 focusing on private agency, home-based ML, and the technical ingredients for secure, local AI systems.
embedding_url: /embeddings/applied-ai-engineering/nvdia-gtc-recap.embedding.json
---

# What a week at NVIDIA GTC 2025! 󰻠
Lots of new information to assimilate, this first-of-many post focuses on private agency related thoughts including putting the puzzle together for Private Agency for My House.

Soumith Chintala (co-creator of PyTorch) provided insights into the evolution of local inference and distributed training, which are foundational for home-based ML.

## Ingredients to the bake Private Agency in the home?

Ignorance is dangerous, so let's take a look at what are the known-knowns, known-unknowns, and unknown-unknowns.

<!-- truncate -->

### Inference

Generalized Local-Language including Specialized Language Models (SLMs)
  - Likely a mixture of experts (MoE) working together in my house—at its most extreme form, it's one-per tool (though this may be an over-optimization).

### Training

Federated Learning Participation for Local Retraining of Data
  - Where is that data stored and in what format(s)? Parquet, Vector DB, or raw JSON?

### Verification
How do we validate data is not being leaked via imported models? Exploring Zero-Knowledge Proofs for model weights.

### Data Tagging by Sensitivity:
Implementing metadata layers that classify data (e.g., Public, Internal, Confidential) to dictate which models can process it.

### Interoperability

Embeddings are model specific, what does a transformation space between embeddings look like? Can an open standard be created (or base embedding features) to allow transformation between embeddings?

## Open major questions
1. In addition to RL/SFT/LoRA/FP Quantization for inference, does anyone see a future without private retraining of models on a regular basis?
- On Hardware:
  - What are the chances of data mixing in a RDMA GPU Mesh? What does a GPU Enclave look like?
  - Private Enclaves exist for Motherboard HBM, Disk and CPU, and [NVIDIA H100 Confidential Computing](https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/).
1. Can the performance impact of segregation at scale become cheap enough to offset the need for local high-end hardware?
1. Adding factual knowledge to a LLM (and suppressing old knowledge) at scale?
1. How can we move embeddings from one model to another model at scale?
1. If the Data Center (née AI Factory) is moving to 600kVA Racks, and 6 Mega-Watt hubs, what does the edge look like?

## Testing Private Agency
Testing Private Agency involves benchmarking local inference speed against cloud-based alternatives while verifying zero-leakage through network monitoring and traffic analysis.


### Detailed Links Training
Hints:
 1. https://developer.nvidia.com/gpudirect
 2. https://github.com/facebookincubator/gloo
 3. https://github.com/horovod/horovod
 4. https://security.apple.com/blog/private-cloud-compute/
 5. https://www.microsoft.com/en-us/research/blog/secure-training-of-machine-learning-models-on-azure/
 6. [NVIDIA H100 Confidential Computing](https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/)

# Players in this space?

### Hosting -
1. https://www.atlantic.net/gpu-server-hosting/hipaa-gpu-hosting/

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
