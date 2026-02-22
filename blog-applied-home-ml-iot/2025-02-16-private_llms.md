---
slug: offline-llms
title: Entirely Private Machine Learning Home Setup
authors: [njl]
tags: [blog, ml, privacy, self-hosted, podman, langfuse, milvus]
description: A deep dive into setting up a private, local machine learning environment using Podman, Langfuse, Milvus, and more on a Mac M2 Pro.
embedding_url: /embeddings/applied-home-ml-iot/offline-llms.embedding.json
---

:::warning
This setup is for educational purposes and reflects a specific point-in-time configuration. Always verify current security practices before deploying to a production-like environment.
:::

<!-- truncate -->

# Title: Entirely Private Machine Learning Home Setup

## Background
**Caveat Emptor**: This is a public blog of what probably should be a private note.

### Machine Specification:
* CPU: Mac M2 Pro
* RAM: 96GB DDR4
* Storage: 1TB NVMe SSD

Tonight turned into an unexpected journey through the rabbit holes of self-hosted technologies. I decided to venture out of my comfort zone, and boy, was it an enlightening experience! Here's a rundown of gotchas:

## Models
### Local Models
- **Llama 3.1 8B/70B**: Our primary general-purpose LLM, running via Ollama.
- **Mistral NeMo**: Excellent for 128k context window tasks.
- **nomic-embed-text**: Our go-to for local embeddings.

## Tools / Components
### Podman Machine: The Immutable Disk Conundrum

[Podman Machine](#podman-machine) on OSX has a fun caveat - the disks were traditionally not resizable! Circa this post, this behavior seemed by design to ensure stability and simplicity. *Update: Newer versions of Podman allow for disk expansion via `podman machine set --disk-size`.*

### Gemini API
While not strictly local, the [Gemini API](https://ai.google.dev/gemini-api/docs) (via Google AI Studio) serves as a benchmark for our local models. We use it with 'Data Sharing' disabled to maintain as much privacy as possible during testing.

### Langfuse: AI on My Terms

[Langfuse](https://langfuse.com/) is a platform for managing and deploying AI models on your own infrastructure. The setup was straightforward, but what fascinated me was the control it offers over model iterations and data privacy. If you're into machine learning but worried about cloud dependencies or data security, Langfuse might just be your knight in shining armor. Be sure to [turn off phone home](https://langfuse.com/self-hosting/configuration) in the self-hosted config.

### Valkey: Open-Source Redis for the Win

**Valkey** came as a surprise. An open-source alternative to Redis, it provides similar data structures and features. My exploration tonight wasn't just about setting it up (which was a breeze) but also understanding its ecosystem. Valkey offers a community-driven approach to key-value stores, which could be particularly appealing in environments where open-source contributions are paramount.

### Minio: S3 Permissions Masterclass

Now, **Minio** was where things got tricky yet incredibly educational. It’s an object storage server compatible with Amazon S3, which I installed to get a grip on handling S3-like storage locally. The real learning curve was the **crash course in S3 Permissions and policy**. Setting up bucket policies, managing access, and ensuring security was like solving a puzzle where every piece affects the other. It was tough but rewarding, and now I have a deeper understanding of S3's permission model, which is invaluable in cloud or self-hosting scenarios.

### Clickhouse: Permissions and Peculiarities
[Clickhouse](https://clickhouse.com/docs/en/interfaces/http), a column-oriented database management system, known for its speed in processing analytical queries, was next on my list. However, setting permissions proved to be wonky. Clickhouse's default user permissions are quite permissive, which I initially found odd. After a few hours of configuration, I realized this approach simplifies many operations but requires careful setup to secure a production environment. It's an excellent lesson in balancing convenience with security.

### Milvus: Vector Search Made Local
[Milvus](https://milvus.io/) caught my eye for its capabilities in similarity search and AI applications, particularly with unstructured data. Setting up a local instance was a breeze, and playing with vector space indexing opened up new realms of what's possible with local infrastructure. It's clear why Milvus is gaining traction for real-time analytics and AI-powered searches.

### Python Inbox Processing: A Practical Challenge

Finally, I dabbled with **Python inbox processing**. This wasn't about setting up something new but optimizing an existing script to handle my email with better efficiency. Parsing emails, extracting information, and organizing it into a database - it was a practical challenge, blending technology with everyday utility.

### Conclusion: A Night of Learning and Laughter

Tonight was not just about tech exploration but also about embracing the learning curve with laughter. Each of these technologies presented unique challenges and solutions, teaching me that in the tech world, the journey itself is often more valuable than the destination.

Whether you're considering going self-hosted, exploring AI, or just curious about container management, I hope my little adventure inspires you to dive in yourself. Remember, tech exploration is not just about mastering tools but about enjoying the ride and learning from each step. Here's to many more nights of tech discoveries!

---

Do let me know if you try any of these out or if you have any other cool self-hosted technologies to explore!

#### podman-machine

For those unfamiliar, Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System.

#### Apple Secure Enclaves

Apple's [Private Cloud Compute](https://security.apple.com/blog/private-cloud-compute/) provides a blueprint for how hardware-level security can scale to the cloud without compromising privacy.

#### Securing H100 GPUs
NVIDIA's [Confidential Computing on H100 GPUs](https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/) ensures that even in multi-tenant environments, your AI workloads remain isolated.

#### Confident Security
[Confident Security](https://confident.security/) is another player focusing on the intersection of data privacy and AI safety.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
