---
title: OM1
description: OpenMind's modular AI runtime for deploying multimodal agents across digital environments and physical robots
date: 2025-12-05T12:07:01.890Z
website: https://github.com/OpenMind/OM1
github: https://github.com/OpenMind/OM1
oss_date: 2025-01-08T21:23:40.000Z
author: OpenMind
tags: []
featured: false
thumbnail: https://opengraph.githubassets.com/1/OpenMind/OM1
category: Agent
---

## Overview

OM1 is a modular AI runtime developed by OpenMind for creating and deploying multimodal agents on digital platforms and physical robots (Humanoids, TurtleBot, quadrupeds, etc.). It ingests diverse inputs—camera, LIDAR, web data—and can produce actions like navigation, manipulation, and conversational responses.

## Key Features

- Modular design with Python-first interfaces and plugin-based hardware adapters (ROS2, Zenoh, CycloneDDS).
- Multimodal input processing and action outputs for motion, navigation, and speech.
- WebSim for local web-based debugging and pre-configured endpoints for common VLMs and LLMs.

## Use Cases

- Research and education: platform for robotics and multimodal agent experiments.
- Prototyping and development: quickly build perception→decision→action pipelines for real robots.
- Simulation and debugging: run complex examples locally with containerized setups and WebSim visualization.

## Technical Highlights

- Implemented with Python and C++ components, supports Docker and recommended Jetson/ macOS setups.
- Rich set of examples, configuration templates, and hardware adapters for rapid integration.
- MIT licensed with active community contributions and published documentation at docs.openmind.org.
