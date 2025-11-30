---
title: vLLM Semantic Router
description: >-
  An intelligent Mixture-of-Models router that directs requests to the most
  suitable models to improve inference accuracy and efficiency.
date: 2025-09-30T02:01:52.197Z
website: 'https://vllm-semantic-router.com/'
github: 'https://github.com/vllm-project/semantic-router'
oss_date: 2025-08-26T21:49:50.000Z
author: vLLM Semantic Router Team
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/vllm-project/semantic-router'
category: Inference
---

## Introduction

vLLM Semantic Router is a high-performance routing framework that uses semantic understanding to dispatch requests to the best-suited model or service, improving accuracy while optimizing cost and latency.

## Key features

- Semantic classification-based model selection (BERT classifier / Mixture-of-Models).
- Similarity caching to reduce redundant computation and latency.
- Enterprise-grade security: PII detection and prompt guard.

## Use cases

- Request routing and model orchestration in multi-model deployments.
- Inference platforms balancing latency, cost, and accuracy.
- Integrating routing as part of an AI gateway or microservice stack.

## Technical details

- Multi-language implementation (Go core with Python benchmarks and Rust bindings).
- Integrations with vLLM and Hugging Face Candle backends, with Grafana dashboards and deployment scripts.
- Comprehensive docs, examples and benchmarks (bench & examples).
