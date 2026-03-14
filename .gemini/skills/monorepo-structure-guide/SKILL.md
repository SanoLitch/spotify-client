---
name: monorepo-structure-guide
description: Guidance on the structure and interaction rules within the monorepo (Turborepo + NPM Workspaces). Use when adding new packages, managing workspace dependencies, or working with shared libraries in `libs/`.
---

# Monorepo Structure Guide

This skill helps navigate and maintain the integrity of our Turborepo-based monorepo. It defines where code belongs and how packages interact.

## Monorepo Layout

- **`apps/`**: Contains standalone applications and services.
  - `backend/`: NestJS services.
  - `frontend/`: Vite-based React applications.
- **`libs/`**: Shared internal libraries and configurations.
  - `ddd/`: Base classes for Domain-Driven Design (Entity, ValueObject, DomainError).
  - `logger/`: Shared logging module.
  - `typescript-config/`: Centralized TS configs.
  - `eslint-config/`: Shared linting rules.

## Dependency Rules

1. **Apps -> Libs**: Apps can depend on any library in `libs/`.
2. **Libs -> Libs**: Libraries can depend on other libraries (e.g., `logger` might depend on `typescript-config`).
3. **Apps -> Apps**: **FORBIDDEN**. No direct dependencies between apps. Use APIs or Event Bus.
4. **Libs -> Apps**: **FORBIDDEN**. Shared libraries must be pure and independent of applications.

## Working with `@libs/ddd`

All business logic in `apps/` should use base classes from `@libs/ddd`:
- **Entities**: Inherit from `BaseEntity`.
- **Value Objects**: Use as immutable wrappers.
- **Errors**: Inherit from `DomainError` for business-rule violations.

## Maintenance Rule: Package Registry
Whenever you add, remove, or significantly change a package in `libs/` or `apps/`, you MUST update the **[Package Registry](references/package-registry.md)**. This ensures our architectural map remains accurate.

## Tooling & Scripts
...
- **Turborepo**: Use `turbo` to run commands across multiple packages (defined in `turbo.json`).
- **NPM Workspaces**: Managed in the root `package.json`. Add new workspaces there if needed.
- **Devbox**: Used for environment consistency. Add global tools to the root `devbox.json`.

For a detailed list of packages and their purposes, see [references/package-registry.md](references/package-registry.md).
