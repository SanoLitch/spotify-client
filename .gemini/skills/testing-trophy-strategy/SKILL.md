---
name: testing-trophy-strategy
description: Testing strategy based on the Testing Trophy (Kent C. Dodds). Focuses on high-confidence tests across Backend (NestJS) and Frontend (React). Use when writing tests to ensure maintainable code with minimal mocks.
---

# Testing Trophy Strategy

This skill helps you apply the **Testing Trophy** philosophy (by Kent C. Dodds) to ensure maximum confidence with minimum maintenance.

## The Trophy Philosophy (Kent C. Dodds)

1. **Static**: Catch typos, type errors, and **layer boundary violations** (tsc, eslint, dependency-cruiser).
2. **Unit Tests**: Test pure logic (Domain entities, utils) in isolation.
3. **Integration Tests (CORE)**: Test parts of the system working together (Use Cases, Component integration).
4. **End-to-End (E2E)**: Verify critical user flows from the outside.

## Implementation Guidelines by Platform

Choose the platform you are currently working on to see specific patterns and best practices:

### 🚀 Backend (NestJS / Hexagonal)
Focuses on testing Use Cases with real repositories and mocked external APIs.
- **Guide**: [references/backend-patterns.md](references/backend-patterns.md)

### 🎨 Frontend (React / Vertical Slices)
Focuses on component interaction and Domain store logic.
- **Guide**: [references/frontend-patterns.md](references/frontend-patterns.md)

## Core Principles
- **Confidence > Coverage**: Don't aim for 100% lines; aim for 100% trust.
- **Co-location**: Place `*.spec.ts` files exactly next to the files they test.
- **Clean Tests**: Extract large mocks and JSON fixtures to separate files (e.g., `test/fixtures/` or `lib/test-fixtures/`).
- **No Boilerplate**: Use centralized test utilities to wrap application setup and dependency injection. Avoid repeating `Test.createTestingModule` in every spec.
- **Follow Platform Standards**: Use `*.spec.ts` for unit/integration and `*.e2e-spec.ts` for E2E.
