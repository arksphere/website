---
title: DualPipe
description: >-
  A bidirectional pipeline parallelism algorithm designed to improve
  compute-communication overlap and training efficiency for large-scale
  pipeline-parallel training.
date: 2025-10-06T02:08:23.229Z
oss_date: 2025-02-26T13:29:57.000Z
website: ''
github: 'https://github.com/deepseek-ai/DualPipe'
author: DeepSeek
tags:
  - training
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/deepseek-ai/DualPipe'
category: Training
---

## Overview

DualPipe proposes a bidirectional pipeline parallelism algorithm to achieve efficient compute-communication overlap in pipeline-parallel training, improving overall throughput and hardware utilization. It has been used in DeepSeek V3/R1 to reduce communication stalls.

## Key Features

- Supports bidirectional pipeline parallelism to enhance compute-communication overlap.
- Designed for integration with existing pipeline-parallel frameworks, reducing integration overhead.
- Provides examples and implementation notes to help teams reproduce and optimize in their own training pipelines.

## Use Cases

- Large-scale pipeline-parallel training across multiple nodes or GPUs.
- Scenarios where communication stalls hurt throughput and improved scheduling can boost performance.
- Research and engineering teams looking for reference implementations and baselines for parallel strategies.

## Technical Details

- Bidirectional pipeline scheduling for better pipeline utilization and communication overlap.
- Focus on scheduling strategies and timing of activation/gradient transfers to reduce idle time.
- Composable with other parallel strategies and adaptable to complex hardware topologies.
