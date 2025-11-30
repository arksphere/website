---
title: Ludwig
description: >-
  Ludwig is a low-code, declarative deep learning framework that enables
  building, training, and deploying models via YAML configuration for
  multi-modal and distributed workflows.
date: 2025-09-30T03:20:43.535Z
website: 'https://ludwig.ai/'
github: 'https://github.com/ludwig-ai/ludwig'
oss_date: 2018-12-27T23:58:12.000Z
author: Ludwig
tags:
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/ludwig-ai/ludwig'
category: Training
---

## Introduction

Ludwig is a low-code, declarative deep learning framework that uses YAML configs to define datasets, models, and training pipelines. It supports multi-task and multi-modal learning and integrates with distributed backends for scale.

## Key features

- Declarative configuration: build models and pipelines with simple YAML files.
- Distributed & backend integrations: support for DDP, DeepSpeed, Ray/Kubernetes and optimized production exports.
- Automation tools: includes hyperparameter search, preprocessing, visualization, and model export utilities.

## Use cases

- Rapid prototyping and benchmarking of ML models without writing boilerplate code.
- Multi-modal research (text, image, audio, tabular) and automated experiment tracking.
- Teams needing a smooth path from local development to cluster production deployment.

## Technical details

- Primarily Python-based with modular design; extensive docs and examples (getting started, examples, tutorials).
- Supports model export (TorchScript/Triton), parameter-efficient fine-tuning (PEFT/QLoRA), and various optimization strategies for production.
