# Specification: Refactor Authentication and Spotify API Integration

## Goal
Refactor the existing authentication flow and Spotify API service to strictly adhere to Clean Architecture and Domain-Driven Design (DDD) principles. The primary objective is to decouple the core business logic from framework-specific implementations (NestJS, React) and external APIs, ensuring architectural portability and high testability.

## Current State Analysis
- **Backend:** Authentication logic is partially integrated into NestJS modules. There's a `SpotifyApiService` but its integration with domain entities and use cases needs verification against `be-rules.md`.
- **Frontend:** Authentication state and API calls are present but need to be clearly separated into Domain (stores), Application (use cases), and Infrastructure (API adapters) layers as per `fe-rules.md`.

## Requirements

### Backend (Clean Architecture & DDD)
- **Domain Layer:** Define clear interfaces for the `AuthProvider` and `UserRepository`. Ensure `User` entity encapsulates its own logic.
- **Application Layer:** Implement Use Cases for "Login", "Logout", and "Refresh Token" that orchestrate domain entities and ports.
- **Infrastructure Layer:**
    - Implement `SpotifyAuthProvider` as an adapter for the `AuthProvider` interface.
    - Ensure `SpotifyApiService` is purely an infrastructure concern, used by the auth provider.
- **API Layer:** Controllers should only interact with Use Cases via DTOs.

### Frontend (Layered Architecture)
- **Domain/Model Layer:** "Smart" MobX stores for `AuthData` and `AuthValidation`.
- **Application Layer:** Use cases for `LoginUseCase` and `LogoutUseCase`.
- **Infrastructure Layer:** `SpotifyAuthApi` adapter that implements a clear port interface.
- **UI Layer:** React components should only depend on Use Cases or the Root Store facade.

### Cross-Cutting
- **Error Handling:** Implement standardized domain errors (e.g., `InvalidCredentialsError`, `TokenExpiredError`).
- **Logging:** Use the centralized `@libs/logger` with standardized patterns.

## Success Criteria
- [ ] Code follows `be-rules.md` and `fe-rules.md` strictly.
- [ ] Core logic is independent of NestJS and React.
- [ ] Unit test coverage for all new/refactored logic is >80%.
- [ ] Spotify OAuth2 flow works end-to-end.
