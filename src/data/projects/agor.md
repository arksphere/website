---
title: Agor
description: >-
  Agor is a multiplayer spatial canvas from Preset for coordinating parallel AI
  assistant sessions and Git-linked worktrees.
date: 2025-11-07T09:12:31.228Z
oss_date: 2025-10-04T19:17:32.000Z
website: 'https://agor.live'
github: 'https://github.com/preset-io/agor'
author: Preset
tags:
  - agent-framework
featured: false
thumbnail: 'https://opengraph.githubassets.com/1/preset-io/agor'
slug: agor
cover: 'https://assets.jimmysong.io/images/ai/agor/banner.webp'
category: Agent
---

## Detailed Introduction

Agor, built by Preset, is a multiplayer spatial canvas—think Figma for AI coding assistants—designed to orchestrate parallel sessions of AI assistants (AI Agent) such as Claude Code, Codex, and Gemini. Users create Git-linked worktrees on a 2D board, drop worktrees into zones to trigger templated prompts, and run isolated environments managed by Agor’s daemon or web UI. The project emphasizes reproducible isolated development environments and real-time team coordination.

## Main Features

- Parallel agent orchestration and scheduling supporting multiple assistant providers.
- Multiplayer spatial canvas with zone triggers to visualize and automate workflows.
- Deep Git worktree integration with isolated environments and automatic port management.
- Integration with Model Context Protocol (MCP) for agent coordination and orchestration.

## Use Cases

Agor is suitable for engineering teams that need to run many AI sessions concurrently: parallel PR workflows, exploring multiple model generation strategies, large-scale code review sessions, and isolated automated regression testing. It helps reduce context switching and enables reproducible experiments across team members.

## Technical Features

- Real-time synchronization via WebSocket with multi-cursor presence and pinned comments.
- Dual runtime model: local daemon for development and web UI for collaborative control.
- Pluggable agent providers and templated zone triggers for building custom automation pipelines.
- Worktree isolation and automatic environment orchestration to prevent port collisions and speed up start/stop cycles.
