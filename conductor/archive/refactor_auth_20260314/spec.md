# Track Specification - Refactor Auth Module Architecture

## Overview
This refactor aims to align the `@apps/backend/src/auth` module with the project's Clean Architecture and DDD requirements. The focus is on decoupling authentication logic from other domains (Library, Streaming) and improving the flexibility of the identity extraction layer, ensuring no regressions in existing functionality.

## Functional Requirements
- **Backend (Auth Module):**
    - **Service Decoupling:** Split `SpotifyApiService` into domain-specific adapters. Move Library and Streaming methods out of the Auth module.
    - **Identity Port:** Refactor `AuthMiddleware` to use a dedicated `IdentityPort` for token extraction, abstracting the source (cookies/headers).
    - **Repository Cleanup:** Replace inline `UserRepositoryPort` mock in `AuthModule` with a proper adapter structure in `ext/storage`.
- **Infrastructure:**
    - Ensure `SpotifyAuthAdapter` is self-contained and only handles Auth-related Spotify API calls.

## Non-Functional Requirements
- **Hexagonal Integrity:** Maintain strict separation between Domain, Application, and Infrastructure layers.
- **Invariants:** Existing authentication flow (OAuth2 callback, cookie-based session) must remain unchanged from the API client's perspective.
- **Module Boundaries:** Remove exports of internal implementation details from `AuthModule`.

## Acceptance Criteria
- [ ] `SpotifyApiService` no longer contains methods for `getSavedTracks`, `getTrack`, or `getAudioStream`.
- [ ] `AuthMiddleware` uses an `IdentityPort` to extract user credentials.
- [ ] All existing Jest tests in `apps/backend/src/auth/**` pass.
- [ ] Manual verification of the login/logout/me flow confirms parity with current behavior.
- [ ] No direct dependencies from `auth` module to `library` or `streaming` logic.

## Out of Scope
- Refactoring how the `Library` or `Streaming` modules consume authentication (this will be handled in subsequent tracks for those modules).
- Migrating from cookies to JWT headers.
- Implementing real database storage for `UserRepositoryPort` (mock/in-memory adapter is sufficient).