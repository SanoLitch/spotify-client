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

## Phase 2: Infrastructure Service Decoupling [checkpoint: 0f8b03b]
Goal: Remove non-auth logic from the auth module and clean up the Spotify API service.

- [x] Task: Extract Library and Streaming logic from `SpotifyApiService` [0df5295]
    - [x] Identify all non-auth methods in `SpotifyApiService`
    - [x] Migration to other modules (Done as part of this track)
- [x] Task: Refactor `SpotifyAuthAdapter` [0df5295]
    - [x] Update it to use a pruned `SpotifyApiService` or direct HTTP client
- [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Repository and Module Cleanup [checkpoint: 7073f74]
Goal: Finalize architectural alignment and remove technical debt.

- [x] Task: Implement proper `InMemoryUserRepositoryAdapter` [7073f74]
    - [x] Move current inline mock to a dedicated file in `ext/storage`
    - [x] Register it in `AuthModule`
- [x] Task: Final Module Configuration and Exports [7073f74]
    - [x] Review `AuthModule` exports and providers
    - [x] Ensure only the necessary ports are available
- [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Final Verification [checkpoint: 7073f74]
Goal: Ensure no regressions and full compliance.

- [x] Task: Run All Existing Tests [7073f74]
    - [x] Verify `apps/backend/src/auth/**` tests pass
- [x] Task: Manual Flow Verification [7073f74]
    - [x] Verify Login -> Callback -> /me -> Logout flow
- [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)