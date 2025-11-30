---
title: Nanotron
description: >-
  A library for pretraining transformer models that simplifies scalable,
  high-performance training from single-node to multi-node setups.
date: 2025-10-02T12:07:28.942Z
website: 'https://huggingface.co/nanotron'
github: 'https://github.com/huggingface/nanotron'
oss_date: 2023-09-11T14:40:28.000Z
author: huggingface
tags:
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/huggingface/nanotron'
category: Training
---

## Introduction

Nanotron is a pretraining-focused library for transformer models that streamlines scalable training workflows from single-node experiments to large multi-node deployments, with performance and usability in mind.

## Key Features

- Support for 3D parallelism (DP/TP/PP), MoE, parameter sharding and custom checkpointing.
- Rich examples and configuration hub for quick starts, quantization, and debugging.
- Performance-first design with fused kernels, CUDA timing tools and benchmark suites.

## Use Cases

- Pretraining custom transformer models on bespoke datasets and scale experiments across clusters.
- Evaluating parallelization strategies and training schedulers for efficiency research.
- Prototyping new training optimizations such as MoE or spectral parametrizations.

## Technical Highlights

- Python-first codebase with performance-critical kernels and multi-node/Slurm support.
- Includes benchmark artifacts and an Ultrascale Playbook to reproduce best configurations.
- Apache-2.0 licensed with active contributors and comprehensive docs/examples.
