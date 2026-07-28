---
slug: recursive-self-improvement
title: 5L Labs Is Working on Recursive Self-Improvement
authors: [njl]
tags: [blog, frontier, recursive-self-improvement, genetic-algorithms, ai-agents, sakana-ai]
description: 5L Labs is pursuing recursive self-improvement with a fundamentally new technique derived from genetic algorithms.
embedding_url: /embeddings/frontier-research/recursive-self-improvement.embedding.json
---

Context:

- [Anthropic: When AI builds itself](https://www.anthropic.com/institute/recursive-self-improvement)
- [Sakana AI: Introducing Sakana AI's Recursive Self-Improvement Lab](https://sakana.ai/rsi-lab/)

5L Labs is working on recursive self-improvement using a fundamentally new technique derived from genetic algorithms.

We are not betting on a single agent rewriting itself in a straight line. We are building a search-and-selection framework that generates, mutates, evaluates, and retains stronger behaviors over time.

<!-- truncate -->

Our approach treats non-bounded objective improvement as population search across candidate model-slices, policies, tools, routing strategies, and code paths.

The loop is simple: generate variants, mutate them, evaluate them against population fitness scores, retain the strongest traits, and recombine what works.
This is a better path than single-thread self-editing because it gives broader search, stronger comparison pressure, and better retention of partial wins.

Evolution worked for humans - why not AI?
5L
