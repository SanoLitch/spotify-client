---
name: nest-hexagonal-architect
description: Guidance for creating and refactoring NestJS modules using Hexagonal (Ports and Adapters) and Clean Architecture. Use when creating new modules, adding features, or ensuring separation of concerns between business logic and infrastructure.
---

# Nest Hexagonal Architect

This skill ensures that your NestJS application follows strict separation of concerns, keeping business logic (Domain) independent of external frameworks and databases (Infrastructure).

## Core Principle: Pure Domain & Classic Mapping

1. **Domain is PURE**: No dependencies on NestJS, Prisma, or external libraries.
2. **Repository Port**: Defined in `domain`, it returns/accepts only `DomainEntity`.
3. **Infrastructure Adapter**: Implements the Port. It is responsible for fetching raw data and mapping it to `DomainEntity` using a `Mapper`.
4. **Use Case**: Orchestrates the flow: `Fetch (Entity) -> Execute Logic -> Save (Entity)`.

## Layer Workflow

When implementing a new feature, follow this order to ensure architectural integrity:

### 1. Define the Domain (`/domain`)
- Create **Entities** and **Value Objects** using domain-specific base classes.
- Define **Repository Ports** (interfaces) that return Domain Entities.
- **Rule**: No logic should depend on HOW data is stored.

### 2. Implement the Use Case (`module-root/*.case.ts`)
- Orchestration logic only.
- Depends ONLY on Repository Ports and Domain Entities.
- Suffix classes with `UseCase` and files with `.case.ts`.

### 3. Implement Infrastructure (`/ext`)
- Create **Adapters** that implement Domain or Application Ports.
- Use **Mappers** (from `/lib`) to translate between `PersistenceModel` and `DomainEntity`.
- **Mapping Flow**: `Database -> Raw Model -> Mapper.toEntity() -> Return Entity`.

### 4. Implement Presentation (`/api`)
- Controllers and Resolvers.
- Maps incoming DTOs to Application DTOs.
- Calls Use Cases and returns Presentation DTOs.

## Nomenclature & Standards

- **Files**: kebab-case.
- **Classes**: PascalCase.
- **Suffixes**: `UseCase`, `Port`, `Adapter`, `Dto`.
- **Exports**: Named exports only.

## Architectural Guardrails (Automated Enforcement)

To prevent "architectural decay," use **`dependency-cruiser`** to enforce layer boundaries:
- **Rule**: `domain` must NEVER import from `app`, `ext`, or `api`.
- **Rule**: `app` must NEVER import from `ext` or `api`.
- **Rule**: `lib` must be stateless and NEVER import from any other layer (except other libs).

For detailed layer responsibilities and file locations, see [references/layers.md](references/layers.md).
