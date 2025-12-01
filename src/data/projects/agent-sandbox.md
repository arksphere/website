---
title: Agent Sandbox
description: >-
  An experimental sandbox project by Kubernetes SIGs aiming to provide a
  Kubernetes-native environment for running, orchestrating, and managing agent
  workloads securely and at scale.
date: 2025-11-12T14:17:18.192Z
oss_date: 2025-08-12T04:55:05.000Z
website: "https://agent-sandbox.sigs.k8s.io"
github: "https://github.com/kubernetes-sigs/agent-sandbox"
author: Kubernetes SIGs
tags:
  - orchestration
featured: false
thumbnail: "https://opengraph.githubassets.com/1/kubernetes-sigs/agent-sandbox"
slug: agent-sandbox
category: Agent
---

## Detailed Introduction

Agent Sandbox is an experimental project initiated by the Kubernetes Special Interest Groups (SIGs). It aims to provide a Kubernetes-native sandbox for running, orchestrating, and managing autonomous agent workloads. The project explores secure, scalable ways to schedule and operate agents within cluster environments.

## Main Features

- Kubernetes-native integration: express and manage agent lifecycles with CRDs/Controllers and other native Kubernetes mechanisms.
- Security isolation: provide isolation at container/Pod level to reduce risks during agent execution.
- Scalable orchestration: support parallel and coordinated agent executions leveraging Kubernetes scheduling and autoscaling capabilities.
- Prototype-first: serves as a research and evaluation platform for experimenting with runtimes and orchestration strategies.

## Use Cases

- Agentic Runtime testing: validate agent runtime behavior and resource usage in real cluster environments.
- Multi-agent orchestration: evaluate coordination and fault-tolerance strategies for distributed multi-agent systems.
- Security and compliance evaluation: test agent access patterns and security policies in an isolated environment.

## Technical Details

The project is hosted on GitHub (kubernetes-sigs/agent-sandbox) under the Apache-2.0 license. It includes example manifests, controller code, and runtime adapters to help the community reproduce and extend experiments across different cluster setups. For more details, visit the project homepage or repository.
