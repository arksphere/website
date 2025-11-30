---
title: DeepEval
slug: deepeval
date: 2025-09-27T01:49:48.109Z
github: 'https://github.com/confident-ai/deepeval'
oss_date: 2023-08-10T05:35:04.000Z
author: confident-ai
tags:
  - evaluation
  - rag
description: >-
  DeepEval is an open-source LLM evaluation framework that provides modular
  metrics and tooling for testing LLM systems and RAG pipelines.
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/confident-ai/deepeval'
category: RAG
---

DeepEval is a lightweight, extensible evaluation framework for large language models (LLMs). It offers a wide range of ready-made metrics (e.g., G-Eval, RAG metrics, hallucination detection) and supports both end-to-end and component-level testing, enabling reproducible benchmarks in local and CI environments.

## Key Features

- Rich metrics: G-Eval, RAG-focused metrics (Answer Relevancy, Faithfulness, RAGAS), agentic metrics, and conversational metrics.
- Flexible evaluation: supports dataset/bulk evaluation, pytest integration, and component tracing with decorators.
- Extensible: custom metrics, synthetic dataset generation, CI/CD integration, and integrations with LlamaIndex and Hugging Face.

## Use Cases

- Regression testing and benchmarking of LLM-powered products.
- Evaluating RAG retrieval quality and answer faithfulness.
- Assessing agent task completion and tool-calling correctness.

## Technical Highlights

- Python-based (requires Python >= 3.9), installable via pip.
- Integrations and examples for popular libraries; supports local NLP models and cloud LLMs.
- Outputs structured evaluation results suitable for analysis and reporting; optional cloud sync with Confident AI platform.
