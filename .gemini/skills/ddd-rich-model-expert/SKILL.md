---
name: ddd-rich-model-expert
description: Domain-Driven Design expert focused on implementing rich domain models, encapsulating business logic in entities, and maintaining invariants. Use when designing business logic, creating entities, value objects, or aggregate roots.
---

# DDD Rich Model Expert

This skill guides you through implementing business logic in a **Rich Domain Model**. Instead of having logic in services, we move it into Entities and Value Objects to ensure consistency and testability.

## Core Principle: Logic Belongs in the Domain

1. **Rich Entities**: Entities are not just data containers. They encapsulate behavior and protect their own state (invariants).
2. **Value Objects (VOs)**: Wrap primitive types (e.g., Email, UUID) to provide self-validation and meaningful types.
3. **Aggregate Roots**: Act as gatekeepers for their cluster of objects. All external interactions must go through the Root.

## Workflow: From Anemic to Rich

When implementing business logic, follow this process:

### 1. Identify Invariants
- What business rules must **always** be true?
- Example: "A player cannot join a session that has already started."
- **Action**: Implement these checks inside the Entity/Aggregate Root methods.

### 2. Encapsulate Primitives (VOs)
- Instead of using `string` or `number`, create Value Objects.
- **Rule**: VOs are immutable and self-validate in the constructor/factory method.
- Example: `Email.create('invalid')` should throw an error immediately.

### 3. Design the Aggregate Root
- Which entity is the entry point?
- **Rule**: All child entities within the aggregate must be modified ONLY via methods on the Root.
- Example: `Session.addPlayer(user)` is valid; `player.session_id = ...` is NOT.

### 4. Implement Behavior (Verbs, not Setters)
- Name methods after business actions: `activate()`, `placeOrder()`, `changeEmail()`.
- Avoid generic `setStatus()` or `setData()` methods.
- **Action**: Use private/protected fields and expose only the behavior.

### 5. Domain Events
- Use events to decouple modules.
- **Rule**: Entity records an event when a significant state change occurs.
- **Naming**: Past tense (e.g., `TrackPlayed`, `SubscriptionExpired`).
- **Action**: Add `addEvent(event)` method to the base Entity class.

### 6. Domain Errors (Exceptions)
- Use custom exceptions for business rule violations.
- **Rule**: Inherit from a base `DomainError`.
- **Action**: Throw specific errors like `InsufficientFundsError` instead of generic `Error`.

## Frontend Adaptation (Reactive Domain)

While the Domain should remain "Pure," the Frontend often uses a **Reactive Domain Model**:
- **Concession**: It is acceptable for a Domain Entity or Store to be a direct implementation of a state manager (e.g., MobX observable or Zustand store).
- **Core Rule**: Even when reactive, the Domain MUST still encapsulate business rules and invariants, moving logic OUT of the UI.
- **Goal**: UI reads state, Use Case triggers action, Domain handles rules.

## Implementation Standards

- **Factory Methods**: Use `static create()` for object instantiation.
- **Identity**: Entities have a unique ID (Uuid); Value Objects have no ID (identity is the value).
- **Persistence Ignorance**: The domain model should not know about databases or ORMs.

For detailed patterns (Aggregate, Entity, VO), see [references/ddd-patterns.md](references/ddd-patterns.md).
