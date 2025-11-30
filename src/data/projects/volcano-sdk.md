---
title: Volcano SDK
description: >-
  Volcano SDK is a TypeScript-first multi-provider AI agent SDK that enables
  chaining LLM reasoning with MCP tools, observability and production patterns.
date: 2025-10-16T01:56:00.000Z
oss_date: 2025-09-22T22:32:21.000Z
website: 'https://volcano.dev/'
github: 'https://github.com/Kong/volcano-sdk'
author: Kong
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/Kong/volcano-sdk'
category: Agent
---

## Overview

Volcano SDK is a TypeScript-first SDK for building multi-provider AI agents. It provides a chainable API to combine LLM steps with MCP tools, supports parallel execution, branching, retries, streaming, and integrates observability for production deployments.

## Key features

- Chainable workflows: Promise-like .then()/.run() patterns for readable multi-step pipelines.  
- Multi-provider support: switch between OpenAI, Anthropic, Mistral, Llama, Bedrock and others per step or globally.  
- Production-ready capabilities: retries, timeouts, OpenTelemetry tracing and metrics export for monitoring.

## Use cases

- Build multi-stage agents that combine extraction, retrieval and generation steps across different models.  
- Integrate MCP tools (retrieval, DB, external APIs) into automated workflows.  
- Run end-to-end validation and performance benchmarks in CI for agent behaviors.

## Technical notes

- TypeScript-first design with rich types and IntelliSense to improve developer productivity.  
- Supports async generators and streaming for real-time UIs and long-running tasks.  
- Extensible MCP integration, connection pooling and tool discovery for scalable deployments.
