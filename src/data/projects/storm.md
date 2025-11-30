---
title: STORM
description: >-
  An open-source system for retrieval-augmented writing and knowledge curation
  that generates outlines and citation-backed articles from web search.
date: 2025-10-02T04:58:12.179Z
website: 'https://storm.genie.stanford.edu/'
github: 'https://github.com/stanford-oval/storm'
oss_date: 2024-03-24T16:23:39.000Z
author: Stanford OVAL
tags:
  - rag
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/stanford-oval/storm'
category: RAG
---

## Overview

STORM (Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking) is an open-source knowledge curation and writing engine from Stanford OVAL that performs internet-based research to generate outlines and produce citation-backed article drafts, useful for researchers and editors during pre-writing stages.

## Key Features

- Two-stage writing pipeline: retrieval and outline generation followed by citation-aware article generation.
- Multi-perspective question asking: discovers diverse perspectives and simulates conversations to generate deeper research questions.
- Co-STORM collaborative mode: supports human-AI collaborative discourse for better alignment and curation.
- Rich retriever support: multiple retrievers (Bing, You, DuckDuckGo, Vector, etc.) and vector grounding options.

## Use Cases

- Pre-writing and research assistance for academics and editors.
- Automated report, review, or Wikipedia-style article drafting.
- Educational tools and dataset generation for knowledge-base construction.

## Technical Highlights

- Implemented in Python with a modular `knowledge_storm` package, easy to extend for custom retrievers and model backends.
- Integrates with litellm and other model adapters to flexibly switch language and embedding models.
- Provides example scripts, datasets (FreshWiki, WildSeek), and reproduction branches for research validation.
