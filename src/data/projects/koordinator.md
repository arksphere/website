---
title: Koordinator
description: >-
  A QoS-based scheduling system for Kubernetes that improves resource
  utilization and runtime reliability for hybrid workloads.
date: 2025-10-11T08:47:28.194Z
oss_date: 2022-03-16T07:14:48.000Z
website: 'https://koordinator.sh'
github: 'https://github.com/koordinator-sh/koordinator'
author: Koordinator
tags:
  - orchestration
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/koordinator-sh/koordinator'
category: Agent
---

## Introduction

Koordinator is a QoS-based scheduling system for Kubernetes designed to improve runtime efficiency and reliability for both latency-sensitive services and batch jobs. It provides unified resource control and scheduling policies to reduce interference between containers, increase node utilization, and simplify resource configuration and tuning.

## Key Features

- QoS-driven scheduling policies to optimize workload placement and interference isolation.
- Automated resource awareness and adjustment to improve cluster density and utilization.
- Modular design for easy integration and upgrade on existing Kubernetes clusters.

## Use Cases

- Latency-sensitive online services (microservices, web services) that require stable performance guarantees.
- Large-scale batch/AI training jobs co-located with other workloads needing isolation and scheduling optimization.
- Production environments that require unified strategies to simplify resource tuning and cost optimization.

## Technical Highlights

- Implements scheduling and resource controls using Kubernetes native extension points, compatible with common CNI/CNI plugins and scheduler extensions.
- Supports multiple metrics collection and policy plugins, enabling customizable scheduling rules per workload needs.
- Community-driven open source project under Apache-2.0 license, suitable for enterprise adoption and extension.
