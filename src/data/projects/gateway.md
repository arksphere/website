---
title: AI Gateway (Portkey)
description: >-
  Portkey's AI Gateway is a high-performance, enterprise-ready LLM routing and
  governance platform that supports many model providers and rich guardrail
  policies.
date: 2025-09-30T01:23:21.253Z
website: 'https://portkey.ai/features/ai-gateway'
github: 'https://github.com/Portkey-AI/gateway'
oss_date: 2023-08-23T11:52:47.000Z
author: Portkey-AI
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/Portkey-AI/gateway'
category: Inference
---

Portkey's AI Gateway is a lightweight, enterprise-grade routing layer that connects requests to 200+ model providers and supports multiple modalities. It offers fast routing, retries and fallbacks, load balancing, extensible guardrails for safety, and auth controls—making it suitable for managing large-scale LLM traffic in production.

## Key features

- Reliable routing: supports fallbacks, automatic retries and rule-based routing to improve availability.
- Multi-modal & broad provider support: integrate text, audio and image models from 200+ providers.
- Security & governance: built-in guardrails, secure key management and role-based access control for compliance.
- Cost & performance optimizations: smart caching, usage analytics and provider optimizations to lower cost and latency.

## Use cases

- Centralized management of multiple LLM providers and model routing within products or enterprises.
- Stable, low-latency model access layer requiring fallbacks and rate-limiting policies.
- Multi-modal or agentic applications that need flexible provider integrations and workflow controls.

## Technical details

- Implementation & ecosystem: primarily implemented in TypeScript, with JS/Node and Python clients, cookbooks and deployment guides.
- Deployment & compatibility: supports Docker, Node.js server, Cloudflare Workers and enterprise cloud deployments; provides an admin console and deployment blueprints.
- Documentation & community: comprehensive docs at <https://portkey.wiki/gh-10> and an active community with many integration examples.
