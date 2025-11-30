---
title: MLX LM
description: >-
  A Python toolkit for running and fine-tuning LLMs on Apple Silicon, with
  support for quantization, distributed inference and Hugging Face integration.
date: 2025-09-15T02:41:45.841Z
github: 'https://github.com/ml-explore/mlx-lm'
oss_date: 2025-03-11T16:38:30.000Z
author: ml-explore
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/ml-explore/mlx-lm'
category: Inference
---

MLX LM is a toolkit focused on running and fine-tuning large language models on Apple Silicon. It provides CLI commands and a Python API for generation, streaming, quantization, and uploading quantized models to the Hugging Face Hub. The library includes prompt caching and a rotating KV cache to improve long-context generation and supports LoRA and full-model fine-tuning for quantized models.

## Key Features

- CLI & Python API: commands like `generate`, `chat`, and `convert`, plus streaming generation utilities.
- Quantization & upload: tools to quantize models (e.g., to 4-bit) and upload them to the Hugging Face community.
- Long prompt support: rotating fixed-size KV cache and prompt caching for efficient long-context generation.

## Use Cases

- Run and fine-tune LLMs locally on Apple Silicon for faster iteration and improved privacy.
- Experiment with quantization and training workflows for research and prototyping.
- Compress and prepare models for sharing via Hugging Face.

## Technical Highlights

- Provides streaming generation, customizable samplers and logits processors.
- Integrates with the Hugging Face Hub for model conversion, quantization and upload.
- Memory- and distribution-oriented features to enable larger models on constrained hardware.
