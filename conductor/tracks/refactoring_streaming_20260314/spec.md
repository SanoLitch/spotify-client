# Specification: Refactor @apps/backend/src/streaming for architectural compliance

## Overview
This track focuses on refactoring the `@apps/backend/src/streaming` module to strictly adhere to the project's Hexagonal Architecture and Clean Architecture standards, as defined in `be-rules.md` and the `nest-hexagonal-architect` skill.

## Goals
- Align the module structure with defined layer responsibilities (api, domain, ext, root).
- Ensure strict naming conventions (e.g., `.case.ts` for use cases).
- Decouple business logic from NestJS-specific constructs within the domain layer.
- Consolidate external logic inside the adapter, removing redundant services.
- Improve dependency injection with symbolic tokens.
- Replace unstructured logging (`console.error`) with the standardized NestJS `Logger`.

## Functional Requirements
- Refactor the existing `StreamTrackUseCase` to move it from `domain/` to the module root and rename it to `stream-track.case.ts`.
- Move `spotify-streaming.adapter.ts` from `ext/` to `ext/spotify/` for better grouping.
- Consolidate the logic from `spotify-streaming-api.service.ts` directly into `spotify-streaming.adapter.ts` and delete the redundant service file.
- Update `streaming.module.ts` to use a symbolic token (`STREAMING_PORT`) for standard NestJS dependency injection.
- Introduce `Logger` from `@nestjs/common` in the adapter and replace `console` usage.

## Non-Functional Requirements
- **Maintainability**: Clear separation of concerns and adherence to layer dependency rules.
- **Portability**: The domain layer must remain pure and free from NestJS dependencies.
- **Strict Naming**: Use kebab-case for files and PascalCase for classes with appropriate suffixes (`.case.ts`, `Port`, `Adapter`).

## Acceptance Criteria
- [ ] `StreamTrackUseCase` is renamed to `StreamTrackCase` and moved to `apps/backend/src/streaming/stream-track.case.ts`.
- [ ] `spotify-streaming.adapter.ts` is relocated to `apps/backend/src/streaming/ext/spotify/`.
- [ ] `SpotifyStreamingApiService` logic is fully integrated into the adapter and the file is deleted.
- [ ] `StreamingModule` is cleaned up and uses standard NestJS provider definitions with a `STREAMING_PORT` token.
- [ ] `console.error` is replaced with NestJS `Logger` in the adapter.
- [ ] `dependency-cruiser` checks pass without any layer violations.
- [ ] All unit and integration tests for the `streaming` module pass with at least 80% coverage.

## Out of Scope
- Adding new streaming features or changing the audio source URL for dummy tracks.
- Significant changes to the `streaming.controller.ts` beyond import updates.