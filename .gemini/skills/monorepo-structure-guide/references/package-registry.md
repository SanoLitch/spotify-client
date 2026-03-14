# Package Registry

Detailed guide for each package and its role in the monorepo.

## Applications (`apps/`)

### `backend`
- **Role**: Core backend services (NestJS).
- **Architecture**: Hexagonal + Clean Architecture.
- **Key Files**: `src/app.module.ts`, `src/auth/`, `src/library/`.

### `frontend`
- **Role**: Client application (Vite + React + MobX).
- **Architecture**: Vertical Slices.
- **Key Files**: `src/app.tsx`, `src/auth/`, `src/library/`.

## Shared Libraries (`libs/`)

### `@libs/ddd`
- **Role**: Base classes for Domain-Driven Design.
- **Contents**: `Entity`, `ValueObject`, `DomainError`, `EmailVO`, `UuidVO`.
- **Usage**: Mandatory for all business logic in applications.

### `@libs/logger`
- **Role**: Standardized logging for both backend and frontend.
- **Contents**: Logger module, types, safe serialization.

### `@libs/typescript-config`
- **Role**: Centralized TypeScript configurations (Base, Vite, Nest, Lib).
- **Usage**: All packages must extend configs from here.

### `@libs/eslint-config`
- **Role**: Shared linting rules (Base, FE).

## Scripts and Configuration
- **`turbo.json`**: Defines build pipeline and caching.
- **`package.json`**: Root dependencies and workspace definitions.
- **`devbox.json`**: Nix-based environment setup (Node.js, Turbo, etc.).
