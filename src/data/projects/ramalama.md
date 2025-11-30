---
title: RamaLama
description: >-
  RamaLama simplifies running and serving AI models by packaging them as OCI
  container images and choosing hardware-optimized images for the host
  automatically.
date: 2025-10-06T10:00:00.000Z
oss_date: 2023-06-01T00:00:00.000Z
website: 'https://ramalama.ai'
github: 'https://github.com/containers/ramalama'
author: containers
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/containers/ramalama'
category: Inference
---

## Overview

RamaLama treats AI models like container images and provides tooling to pull, run, and serve those models using OCI registries. It automatically detects available hardware and chooses accelerated container images, removing the need to manually configure host dependencies for different GPUs or accelerators.

## Key features

- Container-first model runtime and tooling.
- Automatic hardware detection and optimized image selection.
- Secure defaults (network isolation, read-only model mounts).
- REST API and chat interfaces for inference.

## Use cases

- Local development and model testing across hardware variants.
- Edge and cloud deployments with containerized runtimes.
- Model serving for RAG and other inference pipelines.

## Technical notes

- Works with Podman/Docker and multiple transport registries (Hugging Face, OCI registries, Ollama, etc.).
- Prioritizes reproducibility and minimal host configuration by leveraging container images tailored for the detected hardware.
