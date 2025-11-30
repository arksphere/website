---
title: llama.cpp
description: >-
  llama.cpp is a lightweight LLM inference library in C/C++, designed for
  efficient local and cloud inference across diverse hardware.
date: 2025-09-27T03:48:03.947Z
website: 'https://huggingface.co/models?library=gguf'
github: 'https://github.com/ggml-org/llama.cpp'
oss_date: 2023-03-10T18:58:00.000Z
demo: ''
author: ggml-org
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/ggml-org/llama.cpp'
category: Inference
---

## Overview

llama.cpp is a portable C/C++ LLM inference library that enables running large models locally and in the cloud across CPUs, GPUs and other accelerators. It supports GGUF format, multiple quantization schemes, and includes tools for serving, benchmarking and running models.

## Key features

- Minimal dependencies and portable C/C++ implementation.
- Broad backend support: AVX/NEON/AMX (CPU), CUDA, HIP, Metal, Vulkan, MUSA.
- Multiple quantization options and GGUF compatibility.
- OpenAI-compatible `llama-server` and utilities (llama-cli, llama-bench, llama-run).

## Use cases

- Local experimentation and offline inference.
- Private on-premise deployment for data-sensitive scenarios.
- Benchmarking and research on different backends and quantization setups.

## Technical notes

- Implementation: primarily C/C++ with auxiliary Python tooling.
- Models & format: native GGUF support and conversion/quantization scripts in the repo.
- Extensibility: modular tools, extensive CLI options, RPC server, KV cache, speculative decoding.
