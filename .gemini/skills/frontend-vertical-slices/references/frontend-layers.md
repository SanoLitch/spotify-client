# Frontend Layer Responsibilities

Detailed guide for layer separation within a Vertical Slice.

## 1. Module Root (Use Cases)
- **Files**: `login.case.ts`, `add-to-cart.case.ts`.
- **Role**: Entry point for feature behavior.
- **Action**: Orchestrates flows by calling `domain` stores and `ext` adapters.

## 2. `/ui` (Presentation Layer)
- **Contents**: Components (using `ui-framework`), local UI hooks, and styling files (using `styling-solution`).
- **Rule**: **READ ONLY**. Components read state from `domain` but must trigger changes ONLY via `Use Cases`.

## 3. `/domain` (State & Core Layer)
- **Stores**: Reactive containers for feature-specific state (using `state-manager`).
- **Entities/VOs**: Domain objects and business invariants.
- **Rules**: Derived state and business logic reside here.

## 4. `/app` (Application Interface)
- **Contents**: Ports (interfaces) for external communication and Application DTOs.
- **Role**: Defines what the slice expects from the outside world.

## 5. `/ext` (Infrastructure Adapters)
- **Contents**: Adapters for APIs, browser storage, or global event bus.
- **Rule**: Maps raw external data into clean Domain Entities via `Mappers`.

## 6. `/lib` (Utility Layer)
- **Contents**: Stateless helpers, formatting logic, and shared mappers.

## Dependency Chart
```text
ui -> Use Case -> domainStore <- extAdapter (Infrastructure)
                 ^--- lib ---^
```
*Note: The UI layer never modifies state directly; it always goes through a Use Case.*
