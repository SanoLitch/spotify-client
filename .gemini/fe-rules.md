---
description:
globs: apps/frontend/**/*.ts*
alwaysApply: true
---

# Frontend Architecture Standards

Our frontend development follows **Vertical Slice Architecture** with a reactive domain model.

## Key Principles
1. **Vertical Slices**: Code is grouped by business features (e.g., `src/auth`, `src/user`).
2. **Modular Architecture**: Each module follows its own internal layers (`ui`, `domain`, `app`, `ext`, `lib`).
3. **Reactive Domain**: Use reactive stores (e.g., MobX, Zustand) for domain state and logic.
4. **Decoupling**: Interaction via public APIs or an asynchronous Event Bus.

## Technical Rules
- **Styling**: Vanilla Extract (`.css.ts`). Avoid inline styles.
- **UI Primitives**: Use Radix UI for interactive components.
- **Typing**: Explicit types for all DTOs and business objects. No `any` in tests.

## Architecture & Logic
For detailed implementation patterns, use these skills:
- `frontend-vertical-slices`: Feature structure, layer workflow, component rules.
- `ddd-rich-model-expert`: Reactive domain entities and stores.
- `testing-trophy-strategy`: RTL, Vitest, and smoke testing.
