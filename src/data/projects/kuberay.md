---
title: KubeRay
description: >-
  KubeRay is the Ray Project's open-source Kubernetes operator for deploying and
  managing Ray applications on Kubernetes.
date: 2025-11-03T17:08:19.650Z
oss_date: 2020-10-29T20:42:00.000Z
website: 'https://docs.ray.io/en/latest/cluster/kubernetes/index.html'
github: 'https://github.com/ray-project/kuberay'
author: Ray Project
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/ray-project/kuberay'
cover: 'https://assets.jimmysong.io/images/ai/kuberay/banner.webp'
category: AI Infra
---

## Detailed Introduction

KubeRay is the Ray Project's open-source Kubernetes operator for deploying, scaling, and managing Ray applications on Kubernetes. It provides custom resources like RayCluster, RayJob, and RayService to simplify lifecycle management, autoscaling, and high-availability for distributed training, batch processing, and online inference workloads. User-facing documentation is hosted on Ray's docs site while the repository contains development and maintenance resources.

## Main Features

- CRDs for RayCluster, RayJob, and RayService to automate cluster lifecycle and autoscaling.
- Integrations with the Kubernetes ecosystem (Prometheus, Grafana, Ingress, queueing systems, etc.).
- `kubectl ray` plugin and an experimental dashboard to simplify operations.
- Support for production training and inference workloads in cloud-native environments.

## Use Cases

KubeRay is suitable for running Ray workloads on Kubernetes: large-scale training jobs, batch data processing, LLM online inference, and services that require elastic scaling. Organizations can integrate KubeRay into CI/CD, monitoring, and scheduling systems to build observable and resilient ML platforms.

## Technical Features

Implemented primarily in Go, KubeRay follows the Operator pattern and distributes Helm charts and examples. The repo includes tooling, development docs, and quickstarts. See Ray's Kubernetes docs for official user guides: [Ray Kubernetes docs](https://docs.ray.io/en/latest/cluster/kubernetes/index.html).
