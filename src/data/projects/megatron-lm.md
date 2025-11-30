---
title: Megatron-LM
description: Reference implementation for large-scale model training and inference with distributed optimizations.
date: 2025-11-28T02:24:40.723Z
website: https://developer.nvidia.com/
github: https://github.com/NVIDIA/Megatron-LM
oss_date: 2019-03-21T16:15:52.000Z
author: NVIDIA
tags:
  - inference
featured: false
thumbnail: https://opengraph.githubassets.com/1/NVIDIA/Megatron-LM
category: Inference
---

## Overview

Megatron-LM is NVIDIA's reference implementation for training large language models, focusing on GPU-optimized kernels, tensor/pipeline parallelism, and end-to-end training utilities.

## Key features

- Flexible parallelism strategies (tensor, pipeline, context, FSDP).
- Optimized kernels and mixed-precision support (FP16/BF16/FP8).
- End-to-end training scripts and examples.

## Use cases

- Research and engineering for training large-scale LLMs.
- Performance tuning and kernel validation on NVIDIA GPUs.

## Technical highlights

- Built on PyTorch with modular Megatron Core components.
- Integrates with acceleration libraries like Transformer Engine.
