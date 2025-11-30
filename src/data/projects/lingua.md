---
title: Lingua
description: >-
  Meta Lingua: a minimal, research-focused LLM training and inference library
  for fast experimentation.
date: 2025-10-02T12:02:46.347Z
website: 'https://github.com/facebookresearch/lingua'
github: 'https://github.com/facebookresearch/lingua'
oss_date: 2024-10-16T19:16:50.000Z
author: facebookresearch
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/facebookresearch/lingua'
category: Inference
---

## Introduction

Meta Lingua (lingua) is a lightweight LLM training and inference library from Facebook Research designed for researchers to quickly experiment with architectures, losses, and data pipelines while providing tools to analyze speed and stability.

## Key Features

- End-to-end training and inference with example configs and launch scripts.
- Distributed & SLURM support through `stool`, enabling multi-GPU experiments and easy job management.
- Modular components for transformer architectures, optimizers, data loaders, and checkpointing.
- Built-in profiling utilities for MFU/HFU and memory tracing to analyze performance.

## Use Cases

- Research prototyping: rapidly implement and evaluate new ideas at small to medium scale.
- Small-scale training: iterate on architectural choices without heavy infra dependency.
- Teaching and reproducibility: a compact, well-documented codebase for demos and reproducible experiments.

## Technical Highlights

- Pure PyTorch implementation that is easy to read and modify.
- Dataclass-based configurations with CLI overrides for reproducible experiments.
- Comprehensive examples, documentation, and citation information for academic use.
