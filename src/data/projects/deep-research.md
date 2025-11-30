---
title: Tongyi DeepResearch
description: >-
  An open research agent and toolset for long-horizon information-seeking and
  agentic tasks, developed by Tongyi Lab (Alibaba-NLP).
date: 2025-09-18T16:05:24.667Z
website: 'https://tongyi-agent.github.io/blog/introducing-tongyi-deep-research/'
github: 'https://github.com/Alibaba-NLP/DeepResearch'
oss_date: 2025-01-09T11:07:35.000Z
author: Alibaba
tags:
  - rag
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/Alibaba-NLP/DeepResearch'
category: RAG
---

## Introduction

Tongyi DeepResearch is an open-source agentic large language model and toolkit from Tongyi Lab / Alibaba-NLP, designed for long-horizon information-seeking and deep research tasks (family includes 30.5B parameters with efficient activation). The project provides synthetic data pipelines, agent training and inference frameworks, benchmark scripts, and example code for reproducibility and evaluation.

## Key Features

- Fully automated synthetic data generation pipeline for agentic pre-training and supervised fine-tuning.
- End-to-end reinforcement learning pipeline (custom Group Relative Policy Optimization) to improve stability on long-horizon tasks.
- Compatibility with multiple inference paradigms (ReAct, IterResearch), and comprehensive evaluation and benchmark tooling.

## Use Cases

- Information retrieval and knowledge discovery: long-context web retrieval, cross-document QA and evidence aggregation.
- Automated research assistant: literature discovery, experiment plan generation, and result summarization.
- Multi-tool collaborative agents: complex task execution combining retrieval, computation, and external APIs.

## Technical Highlights

- Large-scale continual pre-training with task-oriented synthetic data to enhance reasoning and retrieval abilities.
- Token-level policy gradient RL design with negative-sample selection and stabilization techniques.
- Provides HuggingFace / ModelScope model links and inference scripts to facilitate engineering adoption.
