---
slug: ai-dot-engineer-summit-nyc
title: ai.engineer summit nyc
authors: [njl]
tags: [blog]
description: Key takeaways from the AI Engineering Summit in NYC, focusing on private agents, federated systems, and the Model Context Protocol (MCP).
embedding_url: /embeddings/applied-ai-engineering/ai-dot-engineer-summit-nyc.embedding.json
---
The [AI Engineering Summit](https://www.ai.engineer/) was a definite eye-opener to the speed with which IT is transforming mundane "busy" work and lowering the startup cost for exploring new ideas.


### Take aways for a private agent:
* Do Agents need to be local to be private?
 * Locally on a MacBook Pro (using frameworks like Ollama or llama.cpp)
 * Hosted in a secure enclave on AWS / Azure / GCP using **Trusted Execution Environments (TEEs)**—hardware-isolated areas of a processor that ensure data and code are protected from the host operating system or cloud provider during computation.
* Or can some sort of formal proof be done to leave a multi-tenant agent in the cloud with data privacy? (e.g., exploring Zero-Knowledge Proofs or Fully Homomorphic Encryption)
* For either of the above, how to manage the balance of cost?
* How are we protecting state?
* Where are we storing state?

<!-- truncate -->

Base Research for a federated system of local agents:
* [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol)
 * See AI Entourage
 * MCP provides a standardized way for agents to access local data sources and tools without exposing the entire system.
* FP32->FP8 (FP1 for MoE) and LoRA to shrink the model size, improve inference speed, reduce latency, increase throughput, and reduce cost


### Network Architecture & Details

The network architecture relies on a hub-and-spoke model where a central orchestrator communicates with federated local agents via MCP. This ensures that sensitive data remains within the local "spoke" while still allowing the "hub" to coordinate complex tasks.

- Standardized API specifications for agent-to-agent communication.
- Deployment guides for TEE-based secure enclaves on major cloud providers.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
