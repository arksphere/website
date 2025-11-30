---
title: Haystack
slug: haystack
date: 2025-09-27T02:44:06.592Z
github: 'https://github.com/deepset-ai/haystack'
oss_date: 2019-11-14T09:05:28.000Z
author: deepset-ai
tags:
  - rag
description: >-
  Haystack is an open-source framework for building retrieval-augmented
  generation (RAG) and semantic search applications by combining document
  stores, vector search, and LLMs.
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/deepset-ai/haystack'
category: RAG
---

## Introduction

Haystack, developed by deepset, is an open-source framework that integrates vector search, document indexing and large language models to build production-ready RAG and QA systems. It supports multiple backends and is suitable for enterprise search, knowledge assistants and conversational retrieval scenarios.

## Key Features

- Support for multiple vector stores and retrieval backends (Elasticsearch, Milvus, FAISS, etc.).
- Pluggable embedding and model backends for flexible inference.
- Pipeline abstractions for composing retrieval, re-ranking and generation steps.
- Document processing utilities (parsing, chunking, deduplication) and scalable indexing.
- Production-oriented features: caching, concurrency control and observability hooks.

## Use Cases

- Enterprise knowledge base Q&A: provide natural language answers over internal documents.
- Customer support and virtual assistants: combine retrieval and generation with source citations.
- Document search and summarization: semantic retrieval across documents and concise summaries.
- RAG prototyping and production: quickly compose retrieval and LLMs for vertical applications.

## Technical Highlights

- Modular architecture with clear separation of retrieval, embedding and generation components.
- Batch and streaming indexing to handle large corpora.
- Python SDK and example projects for rapid development and deployment.
- Integrations with Docker and Kubernetes for cloud-native deployment.
