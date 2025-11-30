---
title: Pixeltable
description: >-
  A declarative data infrastructure for multimodal AI workloads that simplifies
  storage, indexing, and inference.
date: 2025-11-20T15:51:56.510Z
oss_date: 2023-05-10T18:03:02.000Z
website: 'https://docs.pixeltable.com'
github: 'https://github.com/pixeltable/pixeltable'
author: Pixeltable
tags:
  - multimodal
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/pixeltable/pixeltable'
slug: pixeltable
category: Inference
---

## Detailed Introduction

Pixeltable is an open-source declarative data infrastructure for multimodal AI applications. It exposes a unified table interface to manage images, video, audio, and documents, making ingestion, transformation, indexing and retrieval first-class capabilities. Pixeltable integrates with Large Language Models (LLM) and external Vector DBs to enable Retrieval-Augmented Generation (RAG) workflows while providing versioning and reproducibility for production workloads.

## Main Features

- Unified multimodal table types: `pxt.Image`, `pxt.Video`, `pxt.Document` to manage diverse media.
- Declarative computed columns: define processing and model inference once; execution is incremental and cached.
- Built-in embedding indexes and semantic search: add embedding indexes directly on tables for similarity search and RAG.
- Broad model and service integrations: adapters for OpenAI, Hugging Face, YOLOX, and more.

## Use Cases

- Multimodal retrieval and Q&A systems (RAG + LLM).
- Automated image/video labeling and object detection pipelines.
- Reproducible data pipelines that combine ETL, feature engineering, and model inference for production deployments.

## Technical Features

- Incremental computation and view maintenance to reduce recomputation costs.
- Extensible UDFs and custom iterators for user-defined processing.
- Local caching and persistent metadata (Postgres) with media stored outside the DB.
- Apache-2.0 licensed with an active contributor community and sample apps.
