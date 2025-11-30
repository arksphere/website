---
title: Kaito
slug: kaito
date: 2025-09-27T03:02:02.565Z
website: 'https://kaito-project.github.io/kaito/docs/'
github: 'https://github.com/kaito-project/kaito'
oss_date: 2023-09-09T01:53:38.000Z
author: kaito-project
tags:
  - cloud-native
  - kubernetes
  - inference
description: >-
  Kaito is a Kubernetes AI Toolchain Operator that automates deployment and
  management of large-model inference and tuning workflows, with built-in RAG
  support and node auto-provisioning.
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/kaito-project/kaito'
category: Inference
---

## Introduction

Kaito is a Kubernetes AI Toolchain Operator that automates deployment and management of large model inference and tuning workloads in Kubernetes, supporting node auto-provisioning, preset configurations and a RAG engine.

## Key Features

- Automated workflows: declare inference or tuning specs through the `Workspace` CRD and let the operator reconcile resources and scheduling.
- RAG support: includes RAGEngine that uses LlamaIndex and FAISS for retrieval-augmented generation.
- Node auto-provisioning: integrates with gpu-provisioner/Karpenter to scale GPU nodes on demand.
- Multi-runtime support: compatible with vLLM, transformers, Ollama and other inference backends.

## Use Cases

- Rapid delivery of large-model inference and RAG services on Kubernetes.
- Multi-node/multi-GPU inference with automated provisioning and cost optimization.
- Research and testing environments for validating deployments and performance.

## Technical Highlights

- Kubernetes-native CRD/controller architecture for seamless integration with cloud-native tooling.
- Helm and Terraform deployment guides and examples for production-ready deployments.
