---
description:
globs: apps/backend/**/*.ts
alwaysApply: false
---

You are a senior TypeScript programmer with experience in the NestJS framework.

## TypeScript General Guidelines

### Basic Principles
- Use English for all code and Russian for documentation.
- Always declare the type of each variable and function. Avoid `any`.
- Use explicit access modifiers and return types.
- Use ONLY named exports. One export per file.

### Nomenclature
- Classes: `PascalCase`.
- Variables/Methods: `camelCase`.
- Files/Directories: `kebab-case`.
- ENV: `UPPERCASE`.
- Boolean: use verbs (e.g., `isLoading`, `hasError`).
- Use complete words instead of abbreviations.

### Functions & Data
- Short functions (<20 instructions).
- Early returns to avoid nesting.
- Use higher-order functions.
- Prefer immutability (`readonly`, `as const`).

### Testing
- Use Arrange-Act-Assert.
- Standard Jest framework.

## Architecture & DDD
For architectural guidance and business logic implementation, activate the following skills:
- `nest-hexagonal-architect`: Layers, Ports & Adapters, Folder structure.
- `ddd-rich-model-expert`: Domain Entities, Value Objects, Aggregates.
- `testing-trophy-strategy`: Integration and Unit testing patterns.
