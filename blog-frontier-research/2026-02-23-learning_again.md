---
slug: learning-again
title: Learning about learning?
authors: [njl]
tags: [blog, ml, embedding_models, learning, sakana-ai, curiosity]
description: Exploring the limits of Transformer architectures, the Platonic Representation Hypothesis, and the role of curiosity-driven learning in the next generation of AI.
embedding_url: /embeddings/frontier-research/learning-again.embedding.json
---

## [Continuing] Beyond LLMs/Transformers

The power-waste, inefficiencies, and general limits of throwing large corpora of labeled data into a blender to create probability distributions of next-token are becoming apparent to the broader world. 

Useful to create once, and part of the solution, but not the answer.

<!-- truncate -->

### Connected, but disconnected thoughts:

## It's the data, stupid!

Multiple papers are coming to interesting observations:
- [The Platonic Representation Hypothesis](https://arxiv.org/abs/2405.07987)
- [Harnessing the Universal Geometry of Embeddings](https://arxiv.org/abs/2505.12540)
- [Universally Converging Representations of Matter Across Scientific Foundation Models](https://arxiv.org/abs/2512.03750)

Which I've taken away as: if the same underlying data is taken, regardless of which blender, the models are going to encode/decode into similar spaces. This has fun implications:

 - Less high-quality and detailed open-source data can generalize to the same embedding concepts as proprietary labeled data.
 - We can (and should) be able to move between same-dim embedding spaces as they should evolve without much loss of the original text.
 - We can use [Matryoshka Representation Learning](https://arxiv.org/abs/2205.13147) to focus on "what's shared" between embedding spaces.

 See: 
1. [Molmo and PixMo: Open Weights and Open Data for State-of-the-Art Vision-Language Models](https://huggingface.co/papers/2409.17146)
2. [Stanford CS231N Deep Learning for Computer Vision | Spring 2025 | Lecture 16: Vision and Language](https://youtu.be/mQOK0Mfyrkk?si=-HcyNzyOl67fTLkS&t=2918)

##  Out-of-Distribution
"Slop" is the natural consequence of leveraging output probabilities fitting a PDF/PD curve. More parameters can, of course, make the field/curve more varied but in the end, it's probability and stats. 

### It's a blessing
Just as most early middle-school kids want to "fit in," we can feel confident going into areas that we are not familiar with and landing towards the median of the curve.

### It's a curse
Outside the median's boilerplate, the edges of language are where real ideas live. **How can we spend our energies at the edge?**

### GraphQL is not the answer.
While I do love talking to the technologists at GraphQL / SurrealDB, they are not the answer as they require manual relationship mapping. We know from papers like [GLiNER2: An Efficient Multi-Task Information Extraction System with Schema-Driven Interface](https://arxiv.org/abs/2507.18546), that we should be able to use "stand-ins" for unique concepts with lower effort at scale. How does that change embedding space distributions and other models? 

## On success outside the straight line
One of the more interesting books that I've come across came from the folks at [Sakana.ai](https://sakana.ai/), entitled ["Why Greatness Cannot Be Planned: The Myth of the Objective"](https://www.goodreads.com/book/show/25670869-why-greatness-cannot-be-planned). Similar to my academic paper backlog, it's slowly being iterated through but is indeed quite interesting, especially when you think about machine learning beyond the transformer architecture. 

## On Curiosity 
Along similarly delightful lines was coming across this video on my YouTube backlog from [Pierre-Yves Oudyer on Curiosity Driven Learning](https://www.youtube.com/watch?v=N2nIie7K7nU). 

Fun new word:
 - **Autotelic**: From the Greek *autos* (self) and *telos* (goal). In the context of curiosity-driven learning, an autotelic agent is one that sets its own goals and finds intrinsic reward in the process of learning itself, rather than just optimizing for an external objective.

Explore more at the [Flowers Inria](https://flowers.inria.fr/) project.

## How am I going to prove it?

By building an "Autotelic Agent"—one that doesn't just respond to prompts but actively explores its environment (via the GarageCam/HomeKit mesh) to build its own internal model of reality. This requires moving beyond the "next-token prediction" blender and into true structured, curiosity-driven exploration.

---
*This post was cleaned up with Automation to clarify thoughts for the reader.*
