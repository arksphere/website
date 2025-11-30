---
title: kgateway
description: >-
  A Kubernetes-native Envoy-powered API and AI gateway that unifies access to
  LLM and inference backends, supports self-hosted models, fine-grained routing,
  and platform-level policy management.
date: 2025-09-17T09:04:36.151Z
website: 'https://kgateway.dev/'
github: 'https://github.com/kgateway-dev/kgateway'
oss_date: 2018-01-22T20:19:49.000Z
demo: ''
author: Solo.io
tags:
  - inference
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/kgateway-dev/kgateway'
category: Inference
---

## Overview

Kgateway is a Kubernetes-native Envoy-powered gateway that serves as both an API gateway and an AI gateway. It centralizes access to LLM and inference backends, supports self-hosted models, and provides fine-grained routing and policy controls.

## Key Features

- Multi-backend & model integrations: built-in integrations for OpenAI, Azure, Vertex, AWS Bedrock, and self-hosted inference backends.
- Cloud-native & extensible: implemented with Gateway API and Envoy, supports Kubernetes CRDs and Helm deployments.
- Flexible routing & policies: function-level routing, authentication, rate-limiting, header mutation, and traffic shaping.
- Observability & operations: metrics export, logging, and OpenTelemetry support for production monitoring.

## Use Cases

- Centralize access to multiple LLM services with unified auth, rate-limiting, and auditing.
- Deploy self-hosted inference clusters at edge or private cloud for privacy and compliance.
- Migrate legacy services to cloud-native architectures with hybrid routing and traffic governance.

## Technical Highlights

- Built with Go and tightly integrated with the Envoy ecosystem and Kubernetes.
- Supports MCP (Model Context Protocol) and Inference Extension for advanced model routing and context federation.
