---
title: Blades
description: >-
  A multimodal AI Agent framework in Go providing pluggable components for
  models, tools, memory, and middleware.
date: 2025-10-02T13:06:14.246Z
website: ''
github: 'https://github.com/go-kratos/blades'
oss_date: 2025-09-15T16:43:22.000Z
author: go-kratos
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/go-kratos/blades'
category: Agent
---

## Overview

Blades is a Go-native multimodal AI Agent framework that emphasizes decoupling and extensibility. Through unified interfaces and pluggable components (ModelProvider, Tool, Memory, Middleware, etc.), it enables building multi-turn conversations, chain reasoning, and structured outputs with clear and maintainable code.

## Key Features

- Go idiomatic design: natural for Go developers with familiar interfaces and patterns.
- Pluggable model providers: adapters allow integrating different LLM services.
- Middleware ecosystem: easily add observability, guardrails, and other cross-cutting features.
- Sync and streaming execution: Run and RunStream interfaces support both realtime and batch scenarios.

## Use Cases

- Building enterprise chatbots and multi-turn QA systems.
- Composing chain-of-thought workflows and multi-step reasoning.
- Wrapping external APIs and databases as Tools for agent invocation.
- Integrating LLM capabilities into high-performance Go deployments.

## Technical Highlights

- Unified Runner abstraction for composing Agent, Chain, and ModelProvider components.
- Memory interfaces with in-memory implementations; extensible to persistent stores.
- Input schemas for Tools ensure structured calls and safer integrations.
- Comprehensive examples and docs in the repository, including an examples directory.
