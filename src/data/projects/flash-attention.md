---
title: Flash Attention
description: >-
  Fast and memory-efficient exact attention implementation optimized for large
  Transformer training and inference.
date: 2025-10-06T02:07:40.645Z
oss_date: 2022-05-19T21:22:06.000Z
website: ''
github: 'https://github.com/Dao-AILab/flash-attention'
author: Dao-AI Lab
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/Dao-AILab/flash-attention'
category: Inference
---

## Overview

Flash Attention is an open-source project that provides a fast, memory-efficient exact attention implementation. It reduces peak memory usage for Transformer attention while maintaining numerical precision, making it suitable for large-scale model training and inference.

## Key Features

- Memory-friendly attention implementation to reduce peak GPU memory.
- High-throughput GPU kernels with support for multiple numeric formats.
- Community-maintained open-source code with integration paths into common deep learning frameworks.

## Use Cases

- Replace standard attention in large-scale language model training to lower memory use and increase batch sizes.
- Improve inference throughput and latency on memory-constrained devices.
- Serve as a baseline and reference for research and engineering efforts on attention performance.

## Technical Details

- Optimized data access and tiling strategies to reduce memory traffic.
- CUDA-based high-performance kernels focusing on parallelism and bandwidth utilization.
- Support for multiple precisions and integration workflows for training and inference.
