---
title: APISIX
description: >-
  APISIX is a high-performance, cloud-native API gateway that can serve as an AI
  Gateway, providing routing, traffic control, and security for model services.
date: 2025-09-26T16:34:31.058Z
website: 'https://apisix.apache.org/'
github: 'https://github.com/apache/apisix'
oss_date: 2019-04-10T02:02:05.000Z
author: APISIX
tags: []
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/apache/apisix'
category: AI Infra
---

## Overview

Apache APISIX is a cloud-native, high-performance API Gateway and AI Gateway providing dynamic routing, load balancing, authentication, rate limiting, and an extensible plugin system. Designed for cloud-native architectures, it offers scalability, observability, and strong protocol support suitable for microservices, Kubernetes, and serverless environments.

## Key Features

- Dynamic routing and load balancing with health checks and service discovery.
- Plugin-based architecture with rich built-in plugins and support for custom extensions (Lua, Go, Wasm).
- Multi-protocol support including HTTP, gRPC, TCP, UDP, and WebSocket.
- Observability and management with Admin API, dashboard, Prometheus metrics, and logging integrations.

## Use Cases

APISIX fits scenarios requiring unified ingress, traffic governance, and API management: public API gateways, microservices ingress, edge proxies, and AI gateway patterns where model inference services are routed and governed. It can be deployed via Helm/Operator on Kubernetes or in traditional container/VM setups.

## Technical Notes

- Performance: built on Nginx/OpenResty and LuaJIT, with optional components in Go and Wasm for isolation and performance.
- Extensibility: hot-reloadable configuration and plugin system that simplifies runtime feature additions.
- Cloud-native friendly: Kubernetes integration, CRDs and operator support, and compatibility with service mesh solutions.

This summary highlights APISIX's capabilities, technical traits, and typical applications to help users quickly understand the project's value.
