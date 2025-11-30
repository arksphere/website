---
title: Axolotl
description: >-
  A free and open-source LLM post-training and fine-tuning framework that
  supports multiple models, training methods, and distributed optimizations.
date: 2025-09-30T03:26:42.536Z
website: 'https://docs.axolotl.ai/'
github: 'https://github.com/axolotl-ai-cloud/axolotl'
oss_date: 2023-04-14T04:25:47.000Z
author: axolotl-ai-cloud
tags:
  - finetune
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/axolotl-ai-cloud/axolotl'
category: Training
---

## Introduction

Axolotl is a free and open-source framework designed to streamline post-training and fine-tuning for modern LLMs. It offers a unified YAML configuration, extensive examples and end-to-end pipelines to simplify dataset preprocessing, fine-tuning, quantization and inference.

## Key features

- Multi-model support (GPT-OSS, LLaMA, Mistral, Mixtral) and multimodal training.
- Multiple training methods: Full fine-tuning, LoRA, QLoRA, GPTQ, QAT, DPO/IPO and more.
- Performance and parallelism: Multipacking, Flash Attention, FSDP/DeepSpeed, Sequence/ND Parallelism.

## Use cases

- Quickly stand up LLM fine-tuning pipelines and benchmarks.
- Large-scale fine-tuning, quantization and inference optimization across single-node multi-GPU and multi-node setups.
- Production-ready fine-tuning workflows deployable via Docker or PyPI packages.

## Technical details

- Built on the PyTorch ecosystem and integrates acceleration libraries such as Flash Attention, Xformers and Liger Kernel.
- Provides extensive docs (including Colab examples) and supports loading datasets from Hugging Face, S3 and other sources.
- Licensed under Apache-2.0 with an active community and many contributors.
