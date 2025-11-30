---
title: LoRAX
description: >-
  A high-performance LoRA inference server that supports on-demand loading of
  thousands of fine-tuned adapters for production deployment.
date: 2025-09-27T04:30:38.320Z
website: 'https://predibase.github.io/lorax'
github: 'https://github.com/predibase/lorax'
oss_date: 2023-10-20T18:19:49.000Z
author: Predibase
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/predibase/lorax'
slug: lorax
category: Inference
---

## Overview

LoRAX (LoRA eXchange) is a LoRA-focused inference server that supports dynamic loading and merging of adapters, enabling efficient inference for thousands of fine-tuned models in GPU/CPU mixed environments.

## Key features

- Dynamic adapter loading: load adapters from Hugging Face, Predibase, or local files on demand and merge adapters per request.
- High throughput and low latency: asynchronous batching, adapter prefetch/offload, and CUDA performance optimizations (flash-attention, paged attention).
- Production-ready: prebuilt Docker images, Helm charts, Prometheus metrics, and distributed tracing support.

## Use cases

- Unified inference and management platform for many fine-tuned models in multi-tenant or personalization scenarios.
- Cost-effective online serving when needing to support many adapters or task-specific models concurrently.

## Technical notes

- Supports FP16 and multiple quantization backends (bitsandbytes, GPT-Q, AWQ) and is compatible with mainstream base models.
- Provides an OpenAI-compatible API and a Python client, supports token streaming and structured JSON outputs.
