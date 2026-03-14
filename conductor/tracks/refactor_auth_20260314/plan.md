# Implementation Plan - Refactor Auth Module Architecture

## Phase 1: Port and Domain Layer Refinement [checkpoint: 9c13598]
Goal: Establish the new ports and refine domain interfaces.

- [x] Task: Define `IdentityPort` and its cookie implementation [8a4da00]
    - [x] Create `IdentityPort` interface
    - [x] Implement `CookieIdentityAdapter`
- [x] Task: Update `AuthMiddleware` to use `IdentityPort` [8a4da00]
    - [x] Inject `IdentityPort` into `AuthMiddleware`
    - [x] Delegate token extraction to the port
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Infrastructure Service Decoupling
Goal: Remove non-auth logic from the auth module and clean up the Spotify API service.

- [ ] Task: Extract Library and Streaming logic from `SpotifyApiService`
    - [ ] Identify all non-auth methods in `SpotifyApiService`
    - [ ] **Note:** Migration to other modules will be handled in a separate track; here we just prune.
- [ ] Task: Refactor `SpotifyAuthAdapter`
    - [ ] Update it to use a pruned `SpotifyApiService` or direct HTTP client
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Repository and Module Cleanup
Goal: Finalize architectural alignment and remove technical debt.

- [ ] Task: Implement proper `InMemoryUserRepositoryAdapter`
    - [ ] Move current inline mock to a dedicated file in `ext/storage`
    - [ ] Register it in `AuthModule`
- [ ] Task: Final Module Configuration and Exports
    - [ ] Review `AuthModule` exports and providers
    - [ ] Ensure only the necessary ports are available
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Final Verification
Goal: Ensure no regressions and full compliance.

- [ ] Task: Run All Existing Tests
    - [ ] Verify `apps/backend/src/auth/**` tests pass
- [ ] Task: Manual Flow Verification
    - [ ] Verify Login -> Callback -> /me -> Logout flow
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)