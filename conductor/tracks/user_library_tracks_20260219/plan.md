# Implementation Plan - User Library: Saved Tracks

## Phase 1: Backend Domain and Application Layers [checkpoint: 651fe1a]
Goal: Define the Track entity and core library logic.

- [x] Task: Define Track Domain Entity and LibraryPort [6be8efd]
    - [ ] Create `Track` entity in `apps/backend/src/library/domain/track.entity.ts`
    - [ ] Define `LibraryPort` interface for fetching saved tracks
- [x] Task: Implement GetSavedTracksUseCase [13e2b71]
    - [ ] Write unit tests for `GetSavedTracksUseCase`
    - [ ] Implement use case to orchestrate track retrieval and pagination
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Backend Infrastructure and API Layers
Goal: Integrate with Spotify API and expose the endpoint.

- [x] Task: Implement Spotify Library Adapter [8417e3b]
    - [ ] Extend `SpotifyApiService` if needed or use it within `SpotifyLibraryAdapter`
    - [ ] Implement `SpotifyLibraryAdapter` mapping Spotify DTOs to `Track` entities
- [x] Task: Create Library Controller [315ad42]
    - [ ] Define `LibraryController` with `GET /library/tracks`
    - [ ] Implement DTOs for pagination and response
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Frontend Domain and Application Layers
Goal: Create reactive stores and use cases for the library.

- [x] Task: Define Frontend Track Model and LibraryStore [337caec]
    - [ ] Create `Track` model in `apps/frontend/src/library/domain/track.model.ts`
    - [ ] Implement `LibraryDataStore` (MobX) to manage tracks, pagination, and loading state
- [x] Task: Implement GetSavedTracks Use Case [8f51259]
    - [ ] Write unit tests for `GetSavedTracksCase`
    - [ ] Implement fetching logic with `LibraryAdapter`
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Frontend Infrastructure and UI Integration
Goal: Connect to the backend API, migrate UI to Radix UI + Vanilla Extract, and implement data-driven routing.

- [ ] Task: Implement Library API Adapter [ ]
    - [ ] Create `LibraryAdapter` using `apiClient` to fetch from backend
- [ ] Task: Create UI Components [ ]
    - [ ] Implement `TrackRow` and `TrackList` components using Vanilla Extract and Radix primitives
    - [ ] Implement infinite scroll logic in `TrackList`
- [ ] Task: Integrate into Home Page [ ]
    - [ ] Update `HomePage` to render the `TrackList`
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
