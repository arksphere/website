---
title: Seldon Core
description: >-
  An MLOps platform to deploy, manage and monitor machine learning models at
  scale on Kubernetes.
date: 2025-09-30T04:25:43.357Z
website: 'https://docs.seldon.io/projects/seldon-core/en/latest/'
github: 'https://github.com/SeldonIO/seldon-core'
oss_date: 2017-12-20T14:51:54.000Z
author: SeldonIO
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/SeldonIO/seldon-core'
category: Inference
---

## Overview

Seldon Core is an industry-ready MLOps and LLMOps framework that converts trained models (TensorFlow, PyTorch, Scikit-learn, etc.) and language wrappers into production-grade microservices on Kubernetes. It provides model routing, experiments, monitoring, and scaling features for production inference workloads across cloud and on-prem environments.

## Key Features

- Support for multiple model types and language wrappers (Python, Java, R, etc.).
- Pre-packaged inference servers and custom server options exposing REST/GRPC APIs.
- Rich observability and analytics integrations (Prometheus, Grafana, Jaeger, ELK) with request logging and distributed tracing.
- Composable inference graphs (predictors, transformers, routers) with support for A/B testing, canaries and experiments.

## Use Cases

- Deploy trained models to Kubernetes and expose stable inference endpoints.
- Conduct model comparison experiments and route traffic for canary or blue/green deployments.
- Integrate monitoring and explainability tools for model health, drift detection and troubleshooting.

## Technical Highlights

- Kubernetes-native with Helm and Kustomize deployment options.
- Multi-model serving and overcommit strategies to optimize resource utilization.
- Python client and CLI for automation and testing.
- Comprehensive documentation and active community; Core v2 brings new capabilities and enterprise options.
