---
title: Agent Lightning
description: Agent Lightning is an open-source framework from Microsoft Research for training and improving AI agents with minimal code changes.
date: 2025-12-05T11:59:56.058Z
oss_date: 2025-06-18T07:28:45.000Z
website: https://microsoft.github.io/agent-lightning/
github: https://github.com/microsoft/agent-lightning
author: Microsoft Research
tags:
  - agent-framework
  - training
featured: false
thumbnail: https://opengraph.githubassets.com/1/microsoft/agent-lightning
category: Training
---

## Overview

Agent Lightning is a Microsoft Research open-source project that enables teams to train and optimize AI agents using reinforcement learning, automatic prompt optimization, and supervised fine-tuning with minimal changes to existing agent code. It centralizes structured traces (prompts, tool calls, rewards) into the LightningStore and provides trainer components and pipelines that can produce improved policies or prompt templates.

## Key features

- Minimal integration effort: plug training loops into existing agents with little or no code rewrite.
- Supports multiple training approaches including RL, automatic prompt optimization, and supervised fine-tuning.
- Compatible with common agent frameworks (e.g., LangChain, AutoGen) and includes examples and pipelines.
- Structured trace collection and centralized storage for reproducible training and evaluation.

## Use cases

- Continuous policy improvement for multi-agent systems operating in real environments.
- Improving long-horizon task performance for task-oriented or dialogue agents.
- Research and benchmarking for agent RL algorithms and training pipelines.

## Technical highlights

- Event tracing and structured telemetry: captures prompts, tool usage, model responses and rewards.
- Pluggable trainers and algorithms: enables integration of custom RL algorithms and optimization loops.
- Framework interoperability and extensibility to fit various deployment and experimentation setups.
