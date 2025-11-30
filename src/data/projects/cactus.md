---
title: Cactus
description: >-
  An energy-efficient inference engine and numerical computing framework for
  phones, optimized for ARM CPUs to run large models with low power and memory
  footprint.
date: 2025-09-22T14:32:13.553Z
website: 'https://cactuscompute.com/docs'
github: 'https://github.com/cactus-compute/cactus'
oss_date: 2025-04-23T14:33:43.000Z
author: cactus-compute
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/cactus-compute/cactus'
category: Inference
---

## Overview

Cactus is a phone-first inference engine and numerical computing framework optimized for ARM CPUs. It focuses on delivering high throughput and low energy usage for mobile LLM inference.

## Key Features

- CPU-first optimization: tuned for ARM CPU performance and reduced battery consumption.
- Unified graph & kernels: Cactus Graph and Cactus Kernels offer zero-copy computation graphs and SIMD-optimized kernels.
- SDKs for mobile: Flutter, React Native, and Kotlin SDKs enable easy integration into mobile apps.

## Use Cases

- Run lightweight or hybrid LLM inference on-device for chat, assistants, and quick generation tasks.
- Embed efficient deep learning inference into mobile apps to reduce latency and energy use.
- Model porting & benchmarking: convert Hugging Face models and validate mobile performance.

## Technical Characteristics

- C API / FFI: OpenAI-compatible C interface for integration across languages.
- Efficient inference: demonstrates higher CPU-only throughput and smaller model footprints versus Llama.cpp on certain workloads.
- Tooling: Python utilities for model conversion, testing scripts, and build instructions.
