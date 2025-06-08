---
slug: offline-llms
title: Entirely Private Machine Learning Home Setup
authors: [njl]
tags: [blog]
---

:::warning

# Title: Entirely Private Machine Learning Home Setup

## Background
<<<<<<< HEAD
**Caveat Emptor**: This is a public blog of what probably should be a private note (quality wise).
:::

=======
**Caveat Emptor**: This is a public blog of what probably should be a private note.
>>>>>>> ff0c541 (Additions to new life`)

### Machine Specification:
* CPU: Mac M2 Pro
* RAM: 96GB DDR4
* Storage: 1TB NVMe SSD

Tonight turned into an unexpected journey through the rabbit holes of self-hosted technologies. I decided to venture out of my comfort zone, and boy, was it an enlightening experience! Here's a rundown of gotchas:

<<<<<<< HEAD
<!-- truncate -->
=======

>>>>>>> ff0c541 (Additions to new life`)
## Models

## Tools / Components
### Podman Machine: The Immutable Disk Conundrum

[Podman Machine](#podman-machine) on OSX has a fun caveat - the disks are not resizable! Circa this post, this behavior seems by design to ensure stability and simplicity.

### Gemini
https://ai.google.dev/gemini-api/docs


### Langfuse: AI on My Terms

https://langfuse.com/
https://langfuse.com/self-hosting/configuration
Turn off phone home
https://langfuse.com/docs/sdk/python/decorators
Next up was **Langfuse**, a platform for managing and deploying AI models on your own infrastructure. The setup was straightforward, but what fascinated me was the control it offers over model iterations and data privacy. If you're into machine learning but worried about cloud dependencies or data security, Langfuse might just be your knight in shining armor.

### Valkey: Open-Source Redis for the Win

**Valkey** came as a surprise. An open-source alternative to Redis, it provides similar data structures and features. My exploration tonight wasn't just about setting it up (which was a breeze) but also understanding its ecosystem. Valkey offers a community-driven approach to key-value stores, which could be particularly appealing in environments where open-source contributions are paramount.

### Minio: S3 Permissions Masterclass

Now, **Minio** was where things got tricky yet incredibly educational. It’s an object storage server compatible with Amazon S3, which I installed to get a grip on handling S3-like storage locally. The real learning curve was the **crash course in S3 Permissions and policy**. Setting up bucket policies, managing access, and ensuring security was like solving a puzzle where every piece affects the other. It was tough but rewarding, and now I have a deeper understanding of S3's permission model, which is invaluable in cloud or self-hosting scenarios.

### Clickhouse: Permissions and Peculiarities
https://clickhouse.com/docs/en/interfaces/http
**Clickhouse**, a column-oriented database management system, known for its speed in processing analytical queries, was next on my list. However, setting permissions proved to be wonky. Clickhouse's default user permissions are quite permissive, which I initially found odd. After a few hours of configuration, I realized this approach simplifies many operations but requires careful setup to secure a production environment. It's an excellent lesson in balancing convenience with security.

### Milvus: Vector Search Made Local
https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/quickstart/build_RAG_with_milvus.ipynb#scrollTo=I3FKEZs9A_uz
**Milvus** caught my eye for its capabilities in similarity search and AI applications, particularly with unstructured data. Setting up a local instance was a breeze, and playing with vector space indexing opened up new realms of what's possible with local infrastructure. It's clear why Milvus is gaining traction for real-time analytics and AI-powered searches.

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

https://security.apple.com/blog/private-cloud-compute/

#### Securify H100 GPUs
https://developer.nvidia.com/blog/confidential-computing-on-h100-gpus-for-secure-and-trustworthy-ai/

#### Confident Security
https://confident.security/
