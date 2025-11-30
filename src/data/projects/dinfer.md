---
title: dInfer
description: >-
  dInfer is an efficient inference framework for diffusion language models,
  focusing on decoding algorithms and KV-cache management to improve throughput
  and quality.
date: 2025-10-15T10:54:22.541Z
oss_date: 2025-09-29T08:07:23.000Z
website: 'https://arxiv.org/abs/2510.08666'
github: 'https://github.com/inclusionAI/dInfer'
author: InclusionAI
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/inclusionAI/dInfer'
category: Inference
---

## Overview

dInfer is an efficient and extensible inference framework for diffusion language models (dLLMs). It modularizes inference into model, diffusion iteration manager, decoding strategy and KV-cache management, offering flexible APIs to combine different algorithms and system optimizations to maximize GPU utilization and throughput.

## Key features

- Multiple decoding algorithms: soft diffusion iterations, hierarchical and parallel decoding strategies for higher throughput while maintaining quality.
- KV-cache strategies: vicinity refresh and cache management to mitigate staleness and improve cache hit rates.
- System-level optimizations: support for tensor and expert parallelism, PyTorch compilation, CUDA Graphs and loop unrolling to reduce kernel overhead.

## Use cases

- High-performance inference services that require improved throughput and lower latency compared to standard autoregressive decoding.
- Benchmarking and system-level optimization when comparing model variants or deploying new decoding algorithms.
- Integration into containerized and distributed inference pipelines for production deployment.

## Technical notes

- Implemented in Python with modular APIs to support different model backends and parallel configurations.
- Designed to leverage both algorithmic and system-level improvements for practical deployment on GPU clusters.
