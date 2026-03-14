---
name: frontend-vertical-slices
description: Guidance for Frontend Vertical Slice Architecture. Focuses on modularity, state isolation, and separation of concerns. Use when creating UI features, managing frontend state, or integrating external APIs.
---

# Frontend Vertical Slices

Vertical Slice Architecture ensures that each business feature is a self-contained unit with its own UI, state, and infrastructure logic.

## Core Principle: Modular Isolation & Reactive State
1. **Vertical Slices**: Code is grouped by feature (e.g., `src/auth`, `src/order`), not by technical type.
2. **Layered Boundaries**: Each slice has internal layers: `ui`, `domain`, `app`, `ext`, `lib`.
3. **Reactive Domain**: Business logic and state live in the `domain` layer using a `state-manager`.
4. **Decoupling**: Slices interact via a `public-api` (exposed store/methods) or an `event-bus`.

## Layer Workflow

### 1. Define the Domain (`/domain`)
- **Entities & Rich Model**: Domain objects must encapsulate business logic and protect invariants, following DDD principles.
- **State Store as Domain**: The State Store (MobX/Zustand) *is* the Domain Model. It is acceptable for the Domain Entity to be an observable implementation of the state manager.
- **Domain Rules**: Validation and business logic reside inside the Store or Entities, not in the UI components.

### 2. Implement Use Cases (`module-root/*.case.ts`)
- Orchestration of UI actions: `Fetch Data -> Update State -> Trigger UI Feedback`.
- Centralized point for slice functionality.

### 3. Implement External Adapters (`/ext`)
- Communication with backend API or browser storage.
- Uses `Mappers` (from `/lib`) to return clean `Entities` to the slice.

### 4. Build the UI (`/ui`)
- Components using the `ui-framework`.
- Styling via the chosen `styling-solution`.
- **Rule**: UI reads state from `domain` but updates it ONLY via Use Cases.

## Nomenclature & Standards
- **Files**: kebab-case.
- **Components/Stores**: PascalCase.
- **Suffixes**: `.case.ts`, `.store.ts`, `.adapter.ts`, `.css.ts`.
- **Exports**: Named exports only.

For detailed frontend layer responsibilities, see [references/frontend-layers.md](references/frontend-layers.md).
