---
title: Memori
description: An open-source SQL-native memory engine that provides persistent, queryable context for Large Language Models.
date: 2025-11-28T02:24:46.680Z
oss_date: 2025-07-24T07:07:51Z
website: https://memorilabs.ai
github: https://github.com/GibsonAI/Memori
author: GibsonAI
tags:
  - rag
featured: false
thumbnail: https://opengraph.githubassets.com/1/GibsonAI/Memori
slug: memori
category: RAG
---

## Detailed Introduction

Memori is an open-source, SQL-native memory engine designed to give any Large Language Model (LLM) persistent, queryable, and auditable memory. Memories are stored in standard SQL databases (SQLite, PostgreSQL, MySQL) that you control, avoiding vendor lock-in and expensive vector database costs.

## Main Features

- SQL-native storage: memories live in familiar relational databases, making export, migration and audit straightforward.
- Multi-framework support: integrates with OpenAI, Anthropic, LiteLLM, LangChain and other common LLM frameworks.
- Intelligent memory management: automatic entity extraction, relationship mapping and context prioritization to surface relevant history.

## Use Cases

Ideal for applications that require persistent conversational context, such as personal assistants, team collaboration tools, customer support, and developer tooling. Memori acts as a backend memory layer so agents can retain background knowledge, user preferences, and task state across sessions.

## Technical Characteristics

- Retrieval-injection flow: retrieve relevant memories before LLM calls and record extracted information after responses.
- Multiple memory modes: short-term, long-term, auto retrieval and conscious injection, with configurable prioritization and compression strategies.
- Easy deployment: connect with a standard SQL connection string and run on existing infra (e.g., Supabase, Neon), with export and backup support.
