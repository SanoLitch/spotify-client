# Implementation Plan: Refactor @apps/backend/src/streaming for architectural compliance

## Phase 1: Preparation & Service Consolidation [checkpoint: 7af38fc]
Goal: Consolidate external logic inside the adapter, replacing the redundant service and standardizing logging.

- [x] Task: Move `apps/backend/src/streaming/ext/spotify-streaming.adapter.ts` into `apps/backend/src/streaming/ext/spotify/`. [31d0aab]
- [x] Task: Migrate logic from `apps/backend/src/streaming/ext/spotify/spotify-streaming-api.service.ts` into `apps/backend/src/streaming/ext/spotify/spotify-streaming.adapter.ts`. [31d0aab]
- [x] Task: Replace all usages of `console.error` with NestJS `Logger` in `spotify-streaming.adapter.ts`. [31d0aab]
- [x] Task: Delete `apps/backend/src/streaming/ext/spotify/spotify-streaming-api.service.ts`. [31d0aab]
- [x] Task: Update the unit tests in `apps/backend/src/streaming/ext/spotify/spotify-streaming.adapter.spec.ts` (create if missing) to test the consolidated logic with injected `HttpService`. [31d0aab]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Preparation & Service Consolidation' (Protocol in workflow.md) [7af38fc]

## Phase 2: Use Case Refactoring (Moving, Renaming)
Goal: Align Use Case naming and location with architectural standards.

- [x] Task: Move `apps/backend/src/streaming/domain/stream-track.use-case.ts` to `apps/backend/src/streaming/stream-track.case.ts`. [83179a1]
- [x] Task: Rename `StreamTrackUseCase` to `StreamTrackCase` and apply `@Injectable()` decorator. [83179a1]
- [x] Task: Move and update `stream-track.use-case.spec.ts` to `stream-track.case.spec.ts`, reflecting the new class name and location. [83179a1]
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Use Case Refactoring' (Protocol in workflow.md)

## Phase 3: Module & Dependency Injection Cleanup
Goal: Standardize provider definitions and clean up `StreamingModule`.

- [x] Task: Update `apps/backend/src/streaming/domain/streaming.port.ts` to export a `STREAMING_PORT` symbol token. [83179a1]
- [x] Task: Refactor `apps/backend/src/streaming/streaming.module.ts` to use standard NestJS provider definitions with the `STREAMING_PORT` token. [1f4872d]
- [x] Task: Update `apps/backend/src/streaming/api/streaming.controller.ts` to use `StreamTrackCase` and verify its specs. [1f4872d]
- [~] Task: Verify that all internal imports within the `streaming` module are correct and follow the kebab-case convention.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Module & Dependency Injection Cleanup' (Protocol in workflow.md)

## Phase 4: Verification & Validation
Goal: Final check of architectural integrity and test coverage.

- [ ] Task: Run `dependency-cruiser` to ensure no layer violations exist in the `streaming` module.
- [ ] Task: Run all tests in the `streaming` module with coverage report and ensure >80% coverage.
- [ ] Task: Perform a final code review to ensure compliance with `be-rules.md` and `nest-hexagonal-architect` skill.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Verification & Validation' (Protocol in workflow.md)