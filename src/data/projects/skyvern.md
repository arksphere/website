---
title: Skyvern
description: >-
  Skyvern is an open-source platform that combines vision and LLMs to automate
  browser-level workflows, available as local software and a managed cloud
  service.
date: 2025-11-07T10:07:43.194Z
oss_date: 2024-02-28T15:45:19.000Z
website: 'https://www.skyvern.com'
github: 'https://github.com/Skyvern-AI/skyvern'
author: Skyvern
tags:
  - agent-framework
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/Skyvern-AI/skyvern'
slug: skyvern
cover: 'https://assets.jimmysong.io/images/ai/skyvern/banner.webp'
category: Agent
---

## Detailed Introduction

Skyvern is an open-source browser automation platform that combines computer vision and multi-agent collaboration with large language models (LLM, Large Language Model) to understand page semantics and drive browser engines like Playwright. It offers both a local service and Skyvern Cloud, aiming to replace brittle selector-based automation with robust, agent-driven workflows that generalize across sites.

## Main Features

- Vision + LLM inference to interact with websites without pre-defined selectors.
- Multi-agent swarm coordination for task decomposition, parallel execution, and result aggregation.
- Workflow building blocks: form filling, data extraction, file downloads, validation, and loop control.
- Support for Model Context Protocol (MCP) and integrations with multiple LLM providers.

## Use Cases

Skyvern is suitable for large-scale browser automation tasks such as invoice downloading across sites, job-application automation, competitor research, and RPA-style business automation. It fits teams that need reproducible automation both on-premises and via a managed cloud offering.

## Technical Features

- Playwright-based browser control with livestreaming for debugging and auditability.
- Pluggable LLM backends and environment configuration: OpenAI, Anthropic, Gemini, Ollama, etc.
- API and Python client with schema-driven outputs for structured, reproducible results.
- Core open-source components under AGPL-3.0; managed cloud adds anti-bot, proxy, and CAPTCHA handling.
