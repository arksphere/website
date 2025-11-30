---
title: Airweave
description: >-
  Airweave lets agents search any app by connecting to apps, productivity tools,
  databases and document stores and turning their contents into searchable
  knowledge bases.
date: 2025-10-01T12:56:32.545Z
website: 'https://airweave.ai/'
github: 'https://github.com/airweave-ai/airweave'
oss_date: 2024-12-24T10:00:06.000Z
author: Airweave
tags:
  - rag
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/airweave-ai/airweave'
category: RAG
---

## Introduction

Airweave enables agents to search and retrieve content from apps, productivity tools, databases and document stores. It handles extraction, embedding and serving, exposing a unified search interface via REST API or MCP.

## Key Features

- Syncs and extracts data from 25+ sources with minimal configuration.
- Entity extraction and transformation pipeline with incremental updates and versioning.
- Exposes search via REST API or MCP; supports multi-tenant OAuth2 flows.
- SDKs for Python and TypeScript for easy integration.

## Use Cases

- Build searchable knowledge bases for RAG systems and intelligent Q&A.
- Allow agents to access app data (documents, email, calendar) for automation tasks.
- Provide semantic search for internal help desks, recommendations and knowledge workflows.

## Technical Highlights

- Backend: FastAPI; vector stores like Qdrant for embeddings.
- Frontend: React + TypeScript with a connector-based UI for managing sources.
- Deployment: Docker Compose for local dev; Kubernetes for production; also offers Airweave Cloud managed service.
