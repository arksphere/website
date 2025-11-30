---
title: Unsloth
description: >-
  High-performance toolkit for fine-tuning and reinforcement learning of large
  models, with memory-efficient kernels and wide model support.
date: 2025-09-30T04:02:56.410Z
website: 'https://docs.unsloth.ai/'
github: 'https://github.com/unslothai/unsloth'
oss_date: 2023-11-29T16:50:09.000Z
demo: ''
author: Unsloth team
tags:
  - finetune
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/unslothai/unsloth'
category: Training
---

## Introduction

Unsloth is a high-performance toolkit for fine-tuning and reinforcement learning of large language and multimodal models. It focuses on memory and compute efficiency to enable training and RL workflows on limited VRAM while supporting exports to common deployment formats.

## Key features

- Support for full fine-tuning, RL algorithms (DPO, GRPO, PPO) and pretraining.
- Efficient Triton-based kernels and 4-bit/8-bit quantization for reduced memory usage.
- Ready-to-run notebooks, Docker images and export paths to GGUF, Hugging Face and Ollama.

## Use cases

- Fine-tuning LLMs and VLMs on constrained GPUs using QLoRA or full-finetune pipelines.
- Applying reinforcement learning for alignment and policy optimization.
- Rapid experimentation via Colab/Kaggle notebooks or production runs with Docker/Blackwell images.

## Technical details

- Built on PyTorch and Triton with compatibility for TRL and vLLM ecosystems.
- Multiple installation options (pip, Docker) and detailed documentation at <https://docs.unsloth.ai/>.
- Models and datasets integrations with Hugging Face and model zoo exports for deployment.
