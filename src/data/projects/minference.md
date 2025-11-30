---
title: MInference
description: >-
  MInference is a framework for long-context LLM inference that accelerates
  pre-filling and large-context processing using dynamic sparse attention and
  optimized kernels.
date: 2025-09-27T04:41:45.816Z
website: 'https://aka.ms/MInference'
github: 'https://github.com/microsoft/MInference'
oss_date: 2024-05-22T12:59:47.000Z
author: Microsoft
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/microsoft/MInference'
slug: minference
category: Inference
---

## Overview

MInference provides million-token-scale prompt inference optimizations for long-context LLMs. It uses dynamic sparse attention, custom kernels, and KV-cache strategies to reduce pre-fill latency while preserving accuracy.

## Key features

- Dynamic sparse attention and pattern-based kernel selection for fast pre-filling.
- Compatible with HF and vLLM ecosystems; includes SCBench for standardized evaluation.

## Use cases

- Long-document QA, repository/code understanding, and other tasks requiring very large context windows.

## Technical notes

- Implements offline/online sparse pattern detection and offers CUDA-accelerated kernels, KV-cache compression, and retrieval utilities for efficient long-context inference.
