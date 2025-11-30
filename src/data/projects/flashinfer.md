---
title: FlashInfer
description: >-
  FlashInfer is a kernel library and JIT toolset for LLM serving that implements
  efficient attention and sampling kernels to improve GPU throughput and latency
  for inference serving.
date: 2025-10-06T10:41:19.665Z
oss_date: 2023-01-01T00:00:00.000Z
website: 'https://flashinfer.ai'
github: 'https://github.com/flashinfer-ai/flashinfer'
author: flashinfer-ai
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/flashinfer-ai/flashinfer'
category: Inference
---

## Introduction

FlashInfer is a kernel library and JIT toolset optimized for LLM serving scenarios. It provides high-performance implementations of attention and sampling, aiming to reduce latency and improve GPU bandwidth utilization. FlashInfer supports integration with PyTorch, TVM, and other frameworks, making it suitable for building high-throughput inference services.

## Key Features

- Efficient sparse/dense attention kernels and sampling implementations.
- Production-ready kernel customization and JIT compilation pipeline, supporting precompilation and caching mechanisms.
- Compatible with mainstream inference frameworks (PyTorch/TVM/C++).
- Memory and operator optimization strategies tailored for LLM serving.

## Use Cases

- Large-scale LLM inference services and low-latency online inference.
- Research and engineering deployment of custom attention or sampling strategies.
- Integration with inference stacks such as vLLM and TGI to optimize overall throughput.

## Technical Highlights

- Provides CUDA and C++ level kernel optimizations, supporting various GPU architectures.
- Enables rapid experimentation and engineering packaging through a plugin-based JIT mechanism.
