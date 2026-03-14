---
description:
globs:
alwaysApply: true
---

# Project Infrastructure

This project is a monorepo based on **Turborepo** and **NPM Workspaces**.

## Project Layout
- `apps/`: Applications and services (Backend, Frontend).
- `libs/`: Shared internal packages and tooling.
- `docs/`: Project documentation.

## Infrastructure Tools
- **NPM**: Package manager.
- **Turborepo**: Build system and pipeline management (`turbo.json`).
- **Devbox**: Nix-based environment setup (`devbox.json`).

## Monorepo Rules
For detailed structure guidance, shared libraries usage, and interaction rules, activate the `monorepo-structure-guide` skill.
