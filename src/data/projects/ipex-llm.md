---
title: IPEX-LLM
slug: ipex-llm
date: 2025-09-27T02:57:50.408Z
github: 'https://github.com/intel/ipex-llm'
oss_date: 2016-08-29T07:59:50.000Z
author: Intel
tags:
  - inference
description: >-
  IPEX-LLM is Intel's XPU acceleration library for PyTorch, designed to speed up
  inference and fine-tuning of large language models on Intel hardware.
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/intel/ipex-llm'
category: Inference
---

## Introduction

IPEX-LLM is Intel's XPU acceleration library for PyTorch, providing optimizations to run LLMs efficiently on Intel XPU (integrated GPUs, Arc dGPUs, NPU) and CPUs.

## Key Features

- Broad compatibility: integrates with llama.cpp, Ollama, vLLM, HuggingFace, LangChain, LlamaIndex and more.
- Low-bit & mixed precision: supports INT4/FP4/FP8 and mixed-precision optimizations to improve throughput and reduce memory footprint.

## Use Cases

- High-performance inference and fine-tuning on Intel-based local and cloud deployments.
- Optimized LLM inference on resource-constrained devices (integrated GPUs or NPUs).

## Technical Highlights

- Deep integration with PyTorch and support for hardware-specific optimizations and pipeline parallelism (e.g., DeepSpeed AutoTP).
- Production tooling: Docker/Helm deployment guides and benchmarking tools for performance evaluation.
