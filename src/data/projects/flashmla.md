---
title: FlashMLA
description: Efficient multi-head latent attention kernels designed to accelerate large-scale Transformer training and inference with reduced memory footprint.
date: 2025-12-11T14:40:48.935Z
website: ""
github: https://github.com/deepseek-ai/flashmla
oss_date: 2025-02-21T06:31:27.000Z
author: DeepSeek
tags:
  - inference
featured: false
thumbnail: https://opengraph.githubassets.com/1/deepseek-ai/FlashMLA
category: Inference
---

## Overview

FlashMLA implements high-performance multi-head latent attention kernels for large Transformer models. It focuses on lowering memory usage and improving throughput through optimized GPU code paths.

## Key Features

- Memory-efficient multi-head latent attention implementation.
- Optimized C++/CUDA kernels for high throughput.
- Designed for easy integration with common Transformer training and inference pipelines.

## Use Cases

- Replacing attention operators in large-scale model training to reduce memory pressure.
- Improving inference throughput and latency in constrained GPU environments.
- Serving as an optimization component in custom or open-source inference stacks.

## Technical Details

- Implemented in C++/CUDA with careful memory layout and parallelization strategies.
- Supports FP16/FP8-friendly scaling strategies for efficient mixed-precision execution.
- Provides interfaces and examples to integrate with PyTorch and similar frameworks.
