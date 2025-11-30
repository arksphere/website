---
title: DataTrove
description: >-
  DataTrove provides composable, platform-agnostic pipelines for large-scale
  text data processing, including extraction, filtering, deduplication and
  saving.
date: 2025-10-02T11:48:06.717Z
draft: false
github: 'https://github.com/huggingface/datatrove'
oss_date: 2023-06-14T12:05:28.000Z
author: Hugging Face
tags:
  - rag
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/huggingface/datatrove'
category: RAG
---

## Overview

DataTrove is an open-source library offering composable pipeline blocks to process, filter and deduplicate large-scale text datasets. It supports various executors and runtime backends to scale from local runs to cluster deployments.

## Key features

- Modular pipeline blocks: readers, writers, extractors, filters and stats.
- Multiple executors: LocalPipelineExecutor, SlurmPipelineExecutor, RayPipelineExecutor for different scales.
- Examples and quickstarts for Common Crawl processing, deduplication, and synthetic data generation.
- Integrations with Hugging Face datasets and tooling; detailed docs and active contributor community.

## Use cases

- Preparing and cleaning corpora for model pretraining or fine-tuning.
- Building preprocessing pipelines for retrieval datasets used in RAG systems.
- Large-scale deduplication and data profiling for dataset hygiene.

## Technical details

- Primary language: Python (small Rust components).
- License: Apache-2.0.
- Installable via pip with optional extras: `datatrove[io]`, `datatrove[processing]`, `datatrove[ray]`, `datatrove[cli]`.
