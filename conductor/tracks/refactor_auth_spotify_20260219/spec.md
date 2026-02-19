# Track Specification - Refactor Authentication and Spotify API Integration

## Goal
Refactor the authentication flow to use Clean Architecture and Port/Adapter patterns, migrating to a modern unstyled UI stack (Radix UI + Vanilla Extract).

## Architecture
- **Backend:** 
    - Domain: `User` entity, `AuthPort`, `UserRepositoryPort`.
    - Application: `LoginUseCase`, `LogoutUseCase`, `MeUseCase`.
    - Infrastructure: `SpotifyAuthAdapter`, `AuthMiddleware`.
- **Frontend:**
    - Domain: `AuthDataStore`, `AuthRootStore` (MobX).
    - Application: `CheckAuthUseCase`, `LogoutUseCase` (renamed to `*.case.ts`).
    - Infrastructure: `SpotifyAuthAdapter` using `ky`.
    - Shared: `@shared` alias for routing, theme, and API client.
    - UI: Radix UI primitives + Vanilla Extract for styling.

## Key Changes
- Replaced Axios with `ky`.
- Removed MUI in favor of Radix UI + Vanilla Extract.
- Implemented a centralized theme in `shared/ui/theme.css.ts`.
- Implemented data-driven routing with `createBrowserRouter`.
- Enforced named exports and explicit DTO typing across the project.