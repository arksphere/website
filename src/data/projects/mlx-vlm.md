---
title: MLX-VLM
description: >-
  A local-first toolkit for inference and fine-tuning of vision-language and
  omni models using MLX, optimized for macOS and general hardware.
date: 2025-09-30T03:34:25.083Z
github: 'https://github.com/Blaizzy/mlx-vlm'
oss_date: 2024-04-16T15:10:12.000Z
author: Blaizzy
tags:
  - inference
  - finetune
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/Blaizzy/mlx-vlm'
category: Inference
---

## Introduction

MLX-VLM is a toolkit built on MLX for local inference and fine-tuning of vision-language and omni models (image/audio/video + text). It provides a CLI, Python API, Gradio chat UI and FastAPI server to help researchers and engineers prototype and deploy multimodal applications on macOS (Apple Silicon) and other hardware.

## Key features

- Multimodal support: images, audio, video and text.
- Multiple runtimes and interfaces: CLI, Python API, Gradio demo and FastAPI server.
- Fine-tuning support including LoRA and QLoRA, with examples and configs.
- Optimizations and examples for Apple Silicon and local inference scenarios.

## Use cases

- Local multimodal experiments such as image question answering, image+audio analysis and video summarization.
- Rapid prototyping using CLI or Gradio UI, or serving models via FastAPI for integration.
- Lightweight fine-tuning or adapter-based adaptation on constrained hardware using LoRA/QLoRA.

## Technical details

- Implemented in Python and built on MLX ecosystem tooling; loads models from mlx-community and compatible sources.
- Offers server endpoints (e.g., /generate, /chat, /responses) and local CLI tools for flexible deployment.
- Licensed under MIT; active community and frequent releases.
