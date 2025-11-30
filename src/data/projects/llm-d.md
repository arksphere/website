---
title: llm-d
description: >-
  A Kubernetes-native distributed inference stack providing well‑lit paths for
  high-performance LLM serving across diverse accelerators.
date: 2025-09-30T01:00:09.590Z
website: 'https://www.llm-d.ai/'
github: 'https://github.com/llm-d/llm-d'
oss_date: 2025-04-29T18:28:17.000Z
author: llm-d
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/llm-d/llm-d'
category: Inference
---

## Overview

llm-d is a Kubernetes-native distributed inference stack that offers tested "well‑lit paths" for serving large generative models at scale. It integrates vLLM, Inference Gateway, and optimized routing and scheduling to reduce time-to-first-token and improve throughput across multi-vendor accelerators.

## Key Features

- Intelligent scheduling that is cache- and workload-aware to maximize KV cache utilization.
- Disaggregated serving patterns (prefill/decode) to reduce latency and improve predictability.
- Support for multiple accelerators and production-ready Helm charts and guides.

## Use Cases

- High-throughput, low-latency online LLM serving and conversational interfaces.
- Large-scale batch inference and embedding pipelines.
- Research and benchmarking of distributed inference strategies and cache-aware routing.

## Technical Details

- Integrates with vLLM and IGW, leveraging high-performance transports (e.g., NIXL) for inter-component communication.
- Provides Helm charts, guides, and reproducible examples for quick production adoption.
- Maintains active documentation and a CI-driven engineering workflow to support multiple deployment scales.
