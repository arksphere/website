---
title: One API
description: >-
  One API is an open-source LLM API management and routing system that unifies
  multiple model providers and offers distribution, quota, and access management
  features.
date: 2025-10-06T10:03:03.743Z
oss_date: 2020-01-01T00:00:00.000Z
github: 'https://github.com/songquanpeng/one-api'
author: one-api
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/songquanpeng/one-api'
category: AI Infra
---

## Overview

One API provides a unified LLM API management and routing layer, supporting multiple model providers (OpenAI, Anthropic, Google Gemini, etc.), routing rules, quotas, and access control to manage model calls and keys centrally.

## Key features

- Multi-provider adapters: uniform calling interface and forwarding to different backends.
- Quota and routing controls: rate limiting and routing policies to ensure stable operations.
- Docker and single-binary deployment: containerized and simple deployment options for quick rollouts.

## Use cases

- Centralized management of multiple model providers' API calls and key management within an organization.
- Unified gateway for multi-tenant model access and quota enforcement.
- On-premise or private deployment for compliance and data governance.

## Technical details

- Implemented with Go/JavaScript, supports Docker deployments and offers rich configuration and documentation. Active community with practical adoption examples.
