---
title: ggml
description: >-
  ggml is a lightweight tensor library for machine learning optimized for
  efficient model inference across hardware.
date: 2025-11-06T17:22:40.739Z
oss_date: 2022-09-18T17:07:19.000Z
website: 'https://huggingface.co/blog/introduction-to-ggml'
github: 'https://github.com/ggml-org/ggml'
author: ggml-org
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/ggml-org/ggml'
category: Inference
---

## Detailed Introduction

ggml is a lightweight C/C++ tensor library aimed at efficient model inference and tensor operations across diverse hardware. It focuses on low memory usage and speed, supports integer quantization, automatic differentiation, and multiple backends (CUDA, HIP, SYCL), and is commonly used to build local inference toolchains and example applications.

## Main Features

- Lightweight and high-performance: optimized for edge and local deployments.
- Multi-hardware support: acceleration backends for CUDA, HIP, and SYCL.
- Quantization-friendly: supports integer quantization to reduce model size and inference cost.
- Minimal dependencies: designed for easy portability without heavy runtime requirements.

## Use Cases

- Local inference: run small or quantized models on desktop, mobile, or embedded devices.
- Tooling: integrate as a custom inference backend or model conversion pipeline component.
- Research: experiment with quantization strategies and low-memory inference techniques.

## Technical Characteristics

- Supports automatic differentiation and common optimizers for lightweight local training experiments.
- Ships with example programs (e.g., GPT inference) for quick onboarding and integration.
- Licensed under MIT, suitable for community-driven ecosystems and commercial use.
