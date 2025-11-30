---
title: Kosong
description: >-
  An LLM abstraction layer for modern agent applications that unifies access to
  models, tools and retrieval components.
date: 2025-11-11T09:32:09.975Z
oss_date: 2025-09-08T14:41:46.000Z
website: 'https://moonshotai.github.io/kosong/'
github: 'https://github.com/MoonshotAI/kosong'
author: MoonshotAI
tags:
  - agent-framework
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/MoonshotAI/kosong'
slug: kosong
category: Agent
---

> An SDK-style abstraction that makes LLM (Large Language Model) capabilities engineering-friendly for building agent applications.

## Detailed Introduction

Kosong, developed by MoonshotAI, is an open-source LLM abstraction layer designed to provide a unified interface and runtime conventions for modern agent applications. It abstracts model backends, tooling, retrieval components and policy engines into modular interfaces, allowing developers to compose models, vector search and external tools into engineering-grade agent workflows via a consistent SDK and adapters. Kosong focuses on extensibility, observability and production integration for multi-model, multi-tool collaboration scenarios.

## Main Features

- Unified LLM abstraction that hides provider differences.
- Plugin adapters to connect OpenAI, Hugging Face, VLLM and other backends and retrieval services.
- Agent-oriented workflow and policy support for task decomposition and tool invocation.
- SDKs, examples and documentation for smooth engineering integration and CI/CD.

## Use Cases

- Multi-agent systems where agents and tools are composed into cooperative pipelines for complex tasks.
- RAG and knowledge retrieval: integrate vector DBs and retrieval layers to improve context quality.
- Production engineering: enable model switching, canarying and monitoring with a single integration layer.

## Technical Features

- Modular architecture: decoupled model, retrieval, tool and policy components for easy replacement and extension.
- Adapter layer and SDK: multi-language adapters and deployment options for diverse stacks.
- Observability and logging: built-in call metrics and event logs for cost and performance analysis.
