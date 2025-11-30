---
title: MedRAX
description: An agent that integrates multimodal models and specialty imaging tools for chest X-ray reasoning.
date: 2025-11-28T02:23:52.591Z
oss_date: 2025-02-06T15:51:23.000Z
website: https://bowang-lab.github.io/MedRAX/
github: https://github.com/bowang-lab/MedRAX
author: Bowang Lab
tags:
  - agent-framework
  - multimodal
featured: false
thumbnail: https://opengraph.githubassets.com/1/bowang-lab/MedRAX
cover: https://assets.jimmysong.io/images/ai/medrax/banner.webp
category: Agent
---

## Detailed Introduction

MedRAX is a medical reasoning agent for chest X-rays (CXR), introduced at ICML 2025, designed to integrate multimodal large language models with a suite of specialized imaging tools. It combines visual QA (CheXagent, LLaVA-Med), segmentation (MedSAM), grounding (Maira-2), report generation (SwinV2), and disease classification (DenseNet-121) to dynamically compose these capabilities and answer complex clinical queries without additional training.

## Main Features

Key features of MedRAX include a modular tool orchestration built on LangChain/LangGraph, support for local and cloud deployments with a production-ready Gradio interface, the ChestAgentBench benchmark (2,500 complex queries) for systematic evaluation, and automatic model weight downloads with support for 8-bit/4-bit quantization to reduce resource requirements.

## Use Cases

MedRAX suits research and clinical-assist scenarios such as automated chest X-ray report generation, complex image question answering and multi-step clinical reasoning evaluation, model comparison and benchmarking, and as a toolkit for hospital research teams. The project supports selective tool initialization to adapt to constrained environments.

## Technical Features

Technically, MedRAX implements an agentic tool-calling architecture on LangChain, combining multimodal LLMs (the paper uses GPT-4o as an example) with dedicated vision models. Its tool-agnostic, modular design makes it easy to extend. The project is released under Apache-2.0 and includes installation instructions and example scripts for reproducibility.
