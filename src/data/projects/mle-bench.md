---
title: MLE-bench
description: >-
  A benchmark suite and toolkit to evaluate AI agents on machine learning
  engineering tasks.
date: 2025-09-30T04:09:08.825Z
website: 'https://openai.com/index/mle-bench/'
github: 'https://github.com/openai/mle-bench'
oss_date: 2024-10-08T17:07:40.000Z
author: OpenAI
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/openai/mle-bench'
category: Agent
---

## Introduction

MLE-bench is a benchmark suite from OpenAI for measuring how well AI agents perform on machine learning engineering tasks. It includes dataset preparation scripts, grading tools, example agents and baselines, and a leaderboard summarizing evaluation results across a diverse set of competitions.

## Key features

- Covers 75 Kaggle competitions with unified prepare and grading scripts.
- Offers a "lite" evaluation split to reduce compute and dataset size for faster experimentation.
- Provides grading tools that accept JSONL/CSV submissions for automated scoring.
- Ships example agents, a reproducible environment image, and experiment code to reproduce leaderboard results.

## Use cases

- Benchmarking and comparing AI agents' end-to-end ML engineering capabilities across tasks like image classification, tabular prediction and seq2seq.
- Reproducing experimental setups and leaderboard results from research papers.
- Building automated evaluation pipelines for continuous benchmarking and CI.

## Technical details

- Implemented primarily in Python; uses the Kaggle API for dataset downloads and Git-LFS for large files.
- Provides Docker and Conda-based environments for reproducible evaluation runs.
- Includes experiment scripts, competition splits, and graders to facilitate reproducible and extensible evaluations.
