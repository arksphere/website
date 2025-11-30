---
title: Agentic Document Extraction
description: >-
  Python library that wraps LandingAI's Agentic Document Extraction API to
  extract structured data from visually complex documents.
date: 2025-09-29T13:53:18.420Z
website: 'https://landing.ai/agentic-document-extraction'
github: 'https://github.com/landing-ai/agentic-doc'
oss_date: 2025-03-12T23:10:57.000Z
author: Landing AI
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/landing-ai/agentic-doc'
category: Agent
---

## Overview

Agentic Document Extraction is a Python library that simplifies calling LandingAI's document extraction API and returns hierarchical JSON and ready-to-render Markdown for visually complex documents (tables, images, charts). It supports long PDFs, images, URLs and includes utilities for visualization and grounding.

## Key Features

- Batteries-included installer: pip package with minimal setup.
- Support for PDFs of any length, images and URLs; automatic splitting and parallel processing for large documents.
- Structured, hierarchical JSON output plus Markdown rendering.
- Visualization tools and optional grounding image exports for debugging.
- Robust retry and backoff handling for API errors and rate limits.

## Use Cases

- Extract structured data from invoices, reports, forms and research papers.
- Batch processing pipelines to parse large document collections.
- Build data pipelines that convert scanned documents into searchable records.

## Technical Highlights

- Language: Python (supports 3.9–3.12).
- Configurable parallelism (BATCH_SIZE, MAX_WORKERS) and retry policies.
- Connectors for Google Drive, S3, local directories and URLs.
- Produces both raw bytes and field-extraction outputs with pydantic models.
