---
title: 'Omnilingual ASR: Open-Source Multilingual Speech Recognition'
description: >-
  An open-source multilingual speech recognition project from Facebook Research
  (Meta) supporting over 1600 languages.
date: 2025-11-12T02:49:29.673Z
oss_date: 2025-11-06T22:38:00.000Z
website: >-
  https://ai.meta.com/research/publications/omnilingual-asr-open-source-multilingual-speech-recognition-for-1600-languages/
github: 'https://github.com/facebookresearch/omnilingual-asr'
author: Facebook Research
tags:
  - inference
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/facebookresearch/omnilingual-asr'
slug: omnilingual-asr
category: Inference
---

## Detailed Introduction

Omnilingual ASR is an open-source multilingual speech recognition project from Facebook Research (Meta) that supports over 1,600 languages. The project combines scalable zero-shot learning and a flexible family of models so new languages can be added with only a few paired examples. The repository provides end-to-end tooling for data preparation, training recipes, evaluation suites, and an inference pipeline, with datasets and demo spaces published on Hugging Face for reproducibility.

## Main Features

- Language-conditioned pipeline covering 1,600+ languages and programmatic language lists.
- Multiple model families: W2V (SSL), CTC, and LLM-ASR variants to balance compute and accuracy.
- End-to-end training and fine-tuning recipes for distributed and reproducible experiments.
- Public dataset (CC-BY-4.0) and Hugging Face demos for easy benchmarking and evaluation.

## Use Cases

- Language inclusion and preservation: quickly build ASR for low-resource languages.
- Research & benchmarking: compare architectures (CTC / LLM-ASR / W2V) across many languages.
- Engineering deployment: choose appropriate model cards and integrate the inference pipeline for batch or streaming transcription.

## Technical Features

- Integrates self-supervised W2V models, CTC training, and LLM-based ASR approaches to trade off generality and precision.
- Provides a programmable inference pipeline, language ID utilities, and batch processing examples for large-scale transcription.
- Transparent asset management for models, tokenizers, and datasets to simplify downloads, caching and reproducibility.
