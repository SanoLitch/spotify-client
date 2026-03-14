# Implementation Plan: Refactor @apps/backend/src/library for architectural compliance

## Phase 1: Preparation & Extraction (DTOs, Mappers) [checkpoint: f3d9f5a]
Goal: Move DTOs out of the controller and introduce a Mapper to handle data transformations.

- [x] Task: Create `apps/backend/src/library/api/dtos/get-tracks.dto.ts` and move `TrackDto` and `GetTracksResponseDto` from `library.controller.ts`. [bb9d5a1]
- [x] Task: Create `apps/backend/src/library/lib/track.mapper.ts` to handle mapping between Spotify API response, Domain Entity, and Presentation DTO. [7e4b854]
- [x] Task: Write unit tests for `TrackMapper` in `apps/backend/src/library/lib/track.mapper.spec.ts`. [c9da0de]
- [x] Task: Conductor - User Manual Verification 'Phase 1: Preparation & Extraction' (Protocol in workflow.md)

## Phase 2: Use Case Refactoring (Moving, Renaming)
Goal: Align Use Case naming and location with architectural standards.

- [x] Task: Move `apps/backend/src/library/domain/get-saved-tracks.use-case.ts` to `apps/backend/src/library/get-saved-tracks.case.ts`. [2f0fac7]
- [x] Task: Rename `GetSavedTracksUseCase` to `GetSavedTracksCase` and apply `@Injectable()` decorator. [e8cc8cc]
- [ ] Task: Update `get-saved-tracks.case.spec.ts` to reflect the new location and class name.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Use Case Refactoring' (Protocol in workflow.md)

## Phase 3: Module & Dependency Injection Cleanup
Goal: Standardize provider definitions and clean up `LibraryModule`.

- [ ] Task: Update `LibraryModule` to use symbolic tokens for `LibraryPort` and standard provider definitions for `GetSavedTracksCase`.
- [ ] Task: Refactor `LibraryController` to use `GetSavedTracksCase` and `TrackMapper`.
- [ ] Task: Verify that all internal imports within the `library` module are correct and follow the kebab-case convention.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Module & Dependency Injection Cleanup' (Protocol in workflow.md)

## Phase 4: Verification & Validation
Goal: Final check of architectural integrity and test coverage.

- [ ] Task: Run `dependency-cruiser` to ensure no layer violations exist in the `library` module.
- [ ] Task: Run all tests in the `library` module with coverage report and ensure >80% coverage.
- [ ] Task: Perform a final code review to ensure compliance with `be-rules.md` and `nest-hexagonal-architect` skill.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Verification & Validation' (Protocol in workflow.md)
