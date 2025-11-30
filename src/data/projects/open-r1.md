---
title: Open R1
description: Open R1 is Hugging Face's open reproduction of DeepSeek-R1, providing training, evaluation and data generation pipelines for researchers to reproduce and extend R1 capabilities.
date: 2025-11-28T02:27:04.890Z
website: https://huggingface.co/open-r1
github: https://github.com/huggingface/open-r1
oss_date: 2025-01-24T15:44:11.000Z
author: Hugging Face
tags:
  - training
featured: false
thumbnail: https://opengraph.githubassets.com/1/huggingface/open-r1
category: Training
---

## Overview

Open R1 is an open reproduction of DeepSeek-R1 maintained by Hugging Face. It exposes end-to-end recipes for distillation, supervised fine-tuning (SFT), and RL training (GRPO), together with datasets and evaluation tooling to reproduce reasoning capabilities.

## Key features

- End-to-end scripts and Makefile targets for data distillation, SFT, GRPO, and evaluation.
- Published datasets such as Mixture-of-Thoughts and OpenR1-Math for training reasoning models.
- Integrations with vLLM, multiple sandbox providers (E2B, Morph), and high-performance training backends.

## Use cases

- Research reproduction: reproduce DeepSeek-R1 training and evaluation results.
- Data generation & distillation: create reasoning traces and distilled datasets for model training.
- Scalable training pipelines: example configs for Slurm, Accelerate and DeepSpeed clusters.

## Technical characteristics

- Implemented primarily in Python; depends on specific PyTorch/vLLM versions and CUDA toolchain.
- Supports DDP and DeepSpeed (ZeRO-2/3), tensor/data parallelism and optimized kernels for large-model training.
- Includes evaluation scripts (lighteval) and benchmark recipes to reproduce metrics on math, code and reasoning benchmarks.
