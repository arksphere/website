---
title: Hopx
description: >-
  A cloud runtime for AI agents offering millisecond startup, Firecracker-based
  isolated microVMs, and multi-language SDKs.
date: 2025-11-17T03:24:49.153Z
oss_date: 2025-11-07T15:52:20.000Z
website: 'https://hopx.ai/'
github: 'https://github.com/hopx-ai/hopx'
author: Hopx
tags:
  - agent-framework
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/hopx-ai/hopx'
slug: hopx
category: Agent
---

## Detailed Introduction

Hopx is a cloud runtime designed for AI agents, providing millisecond startup isolated microVMs and multi-language SDKs to run LLM-driven agents in secure, controlled execution environments. Hopx supports persistent sessions, filesystem access, background processes, and real-time output streaming, enabling stable execution of long-running agents and complex automated workflows.

## Main Features

- Millisecond cold starts for fast interactive workloads.
- VM-level isolation using Firecracker for stronger security boundaries than containers.
- Multi-language SDKs (Python, JavaScript/TypeScript, Go, etc.) with MCP integration.
- Persistent sessions, real-time streaming logs, and runtime monitoring.

## Use Cases

Suitable for running untrusted code in isolated environments: LLM-driven agents, interactive notebooks, long-running jobs, desktop automation, and as an MCP backend for assistants and tools. See the official [documentation](https://docs.hopx.dev/) for integration guides.

## Technical Characteristics

Hopx leverages microVMs and snapshotting to combine strong isolation with fast startup times. Templates and SDKs provide a unified runtime API, while Firecracker and snapshot-based workflows enable safe, fast, and scalable execution of agents and workflows in production environments.
