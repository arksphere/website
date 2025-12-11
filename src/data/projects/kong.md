---
title: Kong
slug: kong
date: 2025-12-11T14:40:31.702Z
website: https://docs.konghq.com/
github: https://github.com/kong/kong
oss_date: 2014-11-17T23:56:08.000Z
demo: https://konghq.com/products/kong-ai-gateway
author: Kong
description: Kong is a high-performance, cloud-native API gateway ideal for managing LLM/MCP requests with robust AI features and a flexible plugin system.
tags: []
featured: false
thumbnail: https://opengraph.githubassets.com/1/Kong/kong
category: AI Infra
---

## Introduction

Kong is a cloud-native, high-performance open-source API gateway that supports a rich plugin system and multiple deployment models. In recent years Kong expanded features for AI scenarios (e.g., AI Gateway, LLM routing, multi-model orchestration and observability), making it suitable as a gateway layer to manage LLM/MCP requests at edge or cloud environments.

## Key Features

- High-performance proxying and flexible routing (L4/L7, load balancing, health checks).
- Extensible plugin architecture and Plugin Hub, supporting Lua/Go/JavaScript extensions.
- Native Kubernetes support with an official Ingress Controller.
- AI-focused capabilities: LLM routing, semantic routing, semantic security, caching and observability.

## Use Cases

- Centralize routing and governance for multiple LLM providers (OpenAI, Anthropic, Azure, AWS, etc.).
- Add authentication, rate limiting, auditing and semantic security policies to external or internal APIs.
- Act as a security and observability layer for MCP (Model Control Plane) traffic in edge or cloud deployments.

## Technical Highlights

- Supports both declarative and database-driven configuration modes for CI/CD and infrastructure-as-code.
- Rich plugin ecosystem and an extensible Plugin Development Kit (PDK).
- Distributed control-plane/data-plane topology to support large-scale deployments.
- Official docs and examples for Docker, Kubernetes and hybrid deployments make it easy to get started.
