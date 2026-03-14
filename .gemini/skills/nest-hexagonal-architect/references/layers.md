# Layer Responsibilities and Structure

A module in the NestJS backend should follow this structure to ensure strict separation of concerns.

## 1. Module Root
- **File Examples**: `login.case.ts`, `register.case.ts`
- **Role**: Entry point for the module's business functionality. Contains **Use Cases**.
- **Constraint**: Orcherstrates the flow, calling Domain Entities and Repository Ports.

## 2. `/api` (Presentation Layer)
- **Role**: Handling incoming requests and formatting outgoing responses.
- **Contents**: Controllers, Resolvers, Presentation DTOs.
- **Dependency**: Depends ONLY on Use Cases and the Application Layer.

## 3. `/app` (Application Layer)
- **Role**: Defines what the application needs from the outside world.
- **Contents**: Application Ports (e.g., `EmailPort`, `StoragePort`), Application DTOs.
- **Dependency**: Depends ONLY on the Domain Layer.

## 4. `/domain` (Core Layer)
- **Role**: Pure business logic and domain rules.
- **Contents**: Entities, Value Objects, Domain Services, Domain Ports (Repository interfaces).
- **Constraint**: **PURE**. No dependencies on NestJS, databases, or external APIs.

## 5. `/ext` (Infrastructure Layer)
- **Role**: Implementations of Ports defined in Domain or Application layers.
- **Contents**: Adapters (e.g., `SpotifyAdapter`, `PrismaAdapter`).
- **Constraint**: Grouped by technology (e.g., `/ext/spotify`, `/ext/storage`). Depends on `app` and `domain` to perform mapping.

## 6. `/lib` (Utility Layer)
- **Role**: Translation and helper logic.
- **Contents**: **Mappers** (transforming Persistence Models <-> Domain Entities <-> DTOs), shared utilities.
- **Constraint**: Stateless and side-effect free.

## Summary Dependency Chart
```text
api -> Use Case (Module Root) -> app -> domain <- ext
                                     ^--- lib ---^
```
*Note: `ext` depends on `domain` and `app` to implement their ports.*
