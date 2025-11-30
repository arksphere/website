---
title: LLaMA Factory
description: >-
  A comprehensive framework for fine-tuning LLaMA models with multiple training
  methods, efficient algorithms, and easy-to-use interface for both research and
  production environments.
date: 2025-07-27T06:00:00.000Z
github: 'https://github.com/hiyouga/LLaMA-Factory'
oss_date: 2023-05-28T10:09:12.000Z
website: 'https://llamafactory.readthedocs.io/'
author: hiyouga
tags:
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/hiyouga/LLaMA-Factory'
slug: llama-factory
category: Training
---

LLaMA Factory is an easy-to-use and efficient platform for training and fine-tuning large language models. With LLaMA Factory, you can fine-tune hundreds of pre-trained models locally without writing any code. Framework features include:

- Models: LLaMA, LLaVA, Mistral, Mixtral-MoE, Qwen, Yi, Gemma, Baichuan, ChatGLM, Phi, etc.
- Trainers: (incremental) pre-training, (multimodal) instruction supervision fine-tuning, reward model training, PPO training, DPO training, KTO training, ORPO training, etc.
- Computation Precision: 16-bit full-parameter fine-tuning, frozen fine-tuning, LoRA fine-tuning, and 2/3/4/5/6/8-bit QLoRA fine-tuning based on AQLM/AWQ/GPTQ/LLM.int8/HQQ/EETQ.
- Optimization Algorithms: GaLore, BAdam, DoRA, LongLoRA, LLaMA Pro, Mixture-of-Depths, LoRA+, LoftQ, and PiSSA.
- Acceleration Operators: FlashAttention-2 and Unsloth.
- Inference Engines: Transformers and vLLM.
- Experiment Monitors: LlamaBoard, TensorBoard, Wandb, MLflow, SwanLab etc.
