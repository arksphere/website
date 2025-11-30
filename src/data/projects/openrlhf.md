---
title: OpenRLHF
description: >-
  An easy-to-use, high-performance open-source RLHF framework built on Ray, vLLM
  and DeepSpeed, supporting distributed and hybrid-engine training.
date: 2025-09-30T04:05:00.213Z
website: 'https://openrlhf.readthedocs.io/'
github: 'https://github.com/OpenRLHF/OpenRLHF'
oss_date: 2023-07-30T02:20:13.000Z
author: OpenRLHF team
tags:
  - finetune
  - training
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/OpenRLHF/OpenRLHF'
category: Inference
---

## Introduction

OpenRLHF is an easy-to-use, high-performance open-source RLHF framework built on Ray, vLLM, DeepSpeed and Hugging Face Transformers. It simplifies RLHF training at scale and supports distributed and hybrid-engine scheduling for models from billions to tens of billions of parameters.

## Key features

- Distributed implementations for PPO, REINFORCE++, GRPO, RLOO and other RL algorithms, leveraging Ray for scalable scheduling.
- vLLM-based accelerated sampling, DeepSpeed ZeRO-3 and AutoTP for memory-efficient, high-throughput training.
- Support for QLoRA/LoRA, RingAttention, FlashAttention, and multi-node training scripts with Docker and example configurations.

## Use cases

- Large-scale RLHF training on multi-node GPU clusters (PPO / REINFORCE++ / DPO, etc.).
- Accelerating sample generation with vLLM to improve RLHF training throughput.
- Research and production use for model alignment, benchmarking and multi-node experiments.

## Technical details

- Architecture uses Ray for distributed scheduling and supports Hybrid Engine to colocate models and vLLM engines for better GPU utilization.
- Deep integration with the Hugging Face and vLLM ecosystems, with provided example scripts, Dockerfiles and detailed documentation at <https://openrlhf.readthedocs.io/>.
- Designed with performance tuning options (async training, packing samples, tensor parallelism, dynamic sampling) for large-model training.
