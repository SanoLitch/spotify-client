# Specification: Refactor @apps/backend/src/library for architectural compliance

## Overview
This track focuses on refactoring the `@apps/backend/src/library` module to strictly adhere to the project's Hexagonal Architecture and Clean Architecture standards, as defined in `be-rules.md` and the `nest-hexagonal-architect` skill.

## Goals
- Align the module structure with the defined layer responsibilities (api, domain, ext, lib, root).
- Ensure strict naming conventions (e.g., `.case.ts` for use cases).
- Decouple business logic from NestJS-specific constructs within the domain layer.
- Improve test coverage and quality.

## Functional Requirements
- Refactor the existing `GetSavedTracksUseCase` to move it from `domain/` to the module root and rename it to `get-saved-tracks.case.ts`.
- Ensure all use cases are properly decorated with `@Injectable()` and use explicit tokens for dependencies where necessary.
- Extract DTOs from `library.controller.ts` into a separate directory or file within the `api/` layer (e.g., `api/dtos/get-tracks.dto.ts`).
- Introduce a `lib/` layer with Mappers to handle transformations between Domain Entities, DTOs, and External Models.
- Update `library.module.ts` to use standard NestJS dependency injection patterns, avoiding manual `useFactory` if possible, or using symbolic tokens for Ports.

## Non-Functional Requirements
- **Maintainability**: Clear separation of concerns and adherence to the layer dependency rules.
- **Portability**: The domain layer must remain pure and free from NestJS dependencies.
- **Strict Naming**: Use kebab-case for files and PascalCase for classes with appropriate suffixes (`.case.ts`, `Port`, `Adapter`, `Dto`, `Mapper`).

## Acceptance Criteria
- [ ] `GetSavedTracksUseCase` is renamed to `GetSavedTracksCase` and moved to `apps/backend/src/library/get-saved-tracks.case.ts`.
- [ ] The `api/` layer contains `LibraryController` and separate DTO files.
- [ ] The `lib/` layer contains `TrackMapper` for domain <-> dto <-> ext transformations.
- [ ] `LibraryModule` is cleaned up and uses standard NestJS provider definitions.
- [ ] `dependency-cruiser` checks pass without any layer violations.
- [ ] All unit and integration tests for the `library` module pass with at least 80% coverage.
- [ ] The code follows the project's nomenclature and style guidelines.

## Out of Scope
- Adding new features to the library module.
- Refactoring the Spotify external API integration itself (only the adapter and mapping logic should be touched).
