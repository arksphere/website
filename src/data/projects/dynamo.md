---
title: Dynamo
description: >-
  Explore Dynamo by NVIDIA, an open-source framework for efficient multi-GPU
  inference, optimizing throughput and latency for large-scale deployments.
date: 2025-09-13T09:59:41.287Z
website: 'https://github.com/ai-dynamo/dynamo'
github: 'https://github.com/ai-dynamo/dynamo'
oss_date: 2025-03-03T18:40:07.000Z
demo: ''
author: ai-dynamo
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/ai-dynamo/dynamo'
category: Inference
---

## Introduction

Dynamo (NVIDIA) is an open-source framework for datacenter-scale inference, addressing orchestration challenges in multi-GPU and multi-node deployments. It is engine-agnostic and supports backends like vLLM, SGLang, and TensorRT-LLM, focusing on throughput, latency, and efficient KV cache management.

## Key Features

- Supports multiple inference engines and deployment topologies
- Disaggregated prefill & decode strategies for throughput/latency tradeoffs
- KV-aware routing and cache offloading for higher system throughput
- Deployment guides and benchmarking tools for production readiness

## Use Cases

- Large-scale online LLM serving across multiple GPUs/nodes
- Performance-sensitive scenarios requiring fine-grained scheduling
- Benchmarking and evaluating inference architectures

## Technical Highlights

- Core implemented in Rust for performance, with Python tooling and extensibility
- Depends on etcd and NATS for coordination and discovery
- Rich engine adapters and examples for Kubernetes and local testing
