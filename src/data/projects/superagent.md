---
title: Superagent
description: >-
  A secure proxy between apps, models and tools that enforces runtime
  protections and validates tool calls.
date: 2025-10-01T01:46:04.556Z
github: 'https://github.com/superagent-ai/superagent'
oss_date: 2023-05-10T18:50:39.000Z
website: 'https://superagent.sh/'
author: Superagent
tags:
  - rag
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/superagent-ai/superagent'
category: RAG
---

## Overview

Superagent is a secure proxy for AI applications that provides runtime protection, tool-call validation, and centralized observability. It helps prevent prompt injection, ensures safe tool execution, and provides compliance logs for audits.

## Key Features

- Runtime protection: detect prompt injections, backdoors, and data leaks in real time.
- Guarded Tooling: validate tool calls and parameters before execution.
- SuperagentLM: reasoning-driven safety model with sub-50ms latency.
- Unified observability: centralized policy, audit, and compliance logs.

## Use Cases

- Protect upstream AI services from malicious prompts or unsafe tool calls.
- Provide unified security policies and auditing across multi-model systems.
- Integrate into CI/CD and runtime environments to protect production AI workloads.

## Technical Highlights

- Multi-language SDKs (Python, TypeScript) and proxy implementations (Node.js, Rust) for high-performance deployments.
- Configurable `superagent.yaml` for flexible model, provider and policy definitions.
- CLI, container, and managed deployment options for cloud and edge scenarios.
