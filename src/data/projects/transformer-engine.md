---
title: Transformer Engine
description: Transformer Engine is an NVIDIA library focused on low-precision training and inference optimizations for Transformer models, supporting formats like FP8 to improve speed and memory efficiency.
date: 2025-12-11T14:38:34.337Z
oss_date: 2022-09-20T15:20:26.000Z
website: https://github.com/NVIDIA/TransformerEngine
github: https://github.com/nvidia/transformerengine
author: NVIDIA
tags:
  - inference
featured: false
thumbnail: https://opengraph.githubassets.com/1/NVIDIA/TransformerEngine
category: Inference
---

## Overview

Transformer Engine is an NVIDIA-implemented acceleration library targeting Transformer-family models. It emphasizes low-precision (e.g., FP8) optimizations to reduce memory footprint and accelerate large-model training.

## Key features

- Low-precision support: deep optimizations for FP8 and mixed-precision training.
- Framework compatibility: provides PyTorch integration and example code for easy adoption.
- Improved throughput and memory usage: suitable for large-scale and distributed training.

## Use cases

- Large-scale Transformer training: improves training efficiency and reduces GPU memory usage in multi-GPU setups.
- Mixed-precision research: explore new numeric formats and trade-offs between speed and model fidelity.

## Technical details

- Implemented with CUDA-backed optimized kernels, offering Python bindings, example integrations, and platform-specific acceleration for NVIDIA GPUs.
