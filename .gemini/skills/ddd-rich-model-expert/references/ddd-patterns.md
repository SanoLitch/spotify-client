# DDD Patterns and Guidelines

A detailed reference for implementing a rich domain model.

## 1. Entities vs. Value Objects

| Feature | Entity | Value Object |
| :--- | :--- | :--- |
| **Identity** | Has a unique ID (Uuid). | Defined by its values. No ID. |
| **Equality** | Equal if IDs are equal. | Equal if all attributes are equal. |
| **Mutability** | Mutable state, constant ID. | Immutable (readonly). |
| **Validation** | Invariants based on state. | Self-validated on creation. |

## 2. The Aggregate Root (Gatekeeper)

An **Aggregate** is a group of related objects treated as a single unit. The **Aggregate Root** is the entry point.

- **Atomicity**: Changes to any object within the aggregate must be atomic.
- **Invariants**: The Root is responsible for enforcing all business rules for the entire aggregate.
- **Lifecycle**: The Root controls the creation and deletion of its child entities.

## 3. Thin Services (Use Cases)

Application Services (Use Cases) should be **Thin Orchestrators**:
1. **Fetch**: Load the Aggregate Root from a Repository.
2. **Execute**: Call a single business method on the Root.
3. **Persist**: Save the modified Aggregate Root back to the Repository.

**Constraint**: All business rules (if/else) should be INSIDE the Root or Entity, NOT in the Service.

## 4. Domain Events (Optional)

Use Domain Events to notify other modules about state changes.
- **Rule**: Events are published AFTER the transaction is successful.
- **Naming**: Past tense (e.g., `OrderPlaced`, `UserRegistered`).
