---
title: Deep Agents
description: >-
  A LangChain library for building deep agents that combine planning, subagents,
  filesystem tools and persistent memory for multi-step reasoning.
date: 2025-11-02T05:07:37.728Z
oss_date: 2025-07-27T23:07:53.000Z
website: 'https://docs.langchain.com/oss/python/deepagents/overview'
github: 'https://github.com/langchain-ai/deepagents'
author: LangChain
tags:
  - agent-framework
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/langchain-ai/deepagents'
category: Agent
---

## Overview

Deep Agents is a LangChain library designed to build "deep" agents capable of long-running, multi-step reasoning. It combines planning tools, subagents, filesystem utilities and persistent memory to decompose complex tasks into manageable subtasks and coordinate their execution reliably.

## Key features

- Built-in planning and todo-list tools to break down problems and track progress.
- Subagent and middleware support for responsibility isolation and composability.
- Filesystem tools and memory primitives to manage long contexts and external data.

## Use cases

- Deep research assistants that gather, synthesize and produce structured reports.
- Automated code workflows that decompose large engineering tasks into tool-driven steps.
- Multi-stage business automation requiring cross-step state and memory.

## Technical highlights

- Modular middleware architecture (PlanningMiddleware, FilesystemMiddleware, SubAgentMiddleware) for extensibility.
- Native Python support and packaging (pip/poetry) and integration with LangGraph for model/tool interoperability.
- MIT-licensed for broad reuse in both community and commercial projects.
