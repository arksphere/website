---
title: ZML
description: >-
  A high-performance inference and compilation stack designed for production
  deployments across diverse hardware and platforms.
date: 2025-09-30T00:51:25.230Z
website: 'https://zml.ai/'
github: 'https://github.com/zml/zml'
oss_date: 2024-09-17T09:13:32.000Z
author: ZML
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/zml/zml'
category: Inference
---

## Overview

ZML is a production-oriented, high-performance inference and compilation stack built with Zig, MLIR, and Bazel. It targets efficient execution across heterogeneous hardware (NVIDIA, AMD, TPU, etc.) and provides examples, tooling, and documentation for integration in both research and engineering contexts.

## Key Features

- High-performance runtime with support and optimizations for multiple accelerators (CUDA, ROCm, TPU).
- Portable builds through Bazel, enabling cross-compilation and reproducible deployments.
- Comprehensive examples and tooling, including example models and benchmarking suites.

## Use Cases

- Deploying high-throughput inference services in production environments.
- Compiling and benchmarking models across heterogeneous accelerator fleets.
- Research on high-performance inference and cross-device collaborative execution.

## Technical Details

- Core components implemented in Zig for low overhead and portability.
- Integrates MLIR/OpenXLA toolchains for compilation and multi-backend targeting.
- Uses Bazel to provide reproducible builds and manage complex dependencies.
