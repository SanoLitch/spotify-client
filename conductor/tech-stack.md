# Technology Stack

## Core & Shared
- **Programming Language:** TypeScript (v5.9+)
- **Monorepo Management:** Turborepo
- **Package Manager:** NPM (Workspaces)
- **Environment Management:** Devbox, Docker (Local services)
- **Architecture:** Clean Architecture, Domain-Driven Design (DDD)

## Backend (apps/backend)
- **Framework:** NestJS (v11+)
- **Networking:** Axios (via @nestjs/axios)
- **Validation:** class-validator, class-transformer
- **API Documentation:** Scalar (via @nestjs/swagger)
- **Tooling:** Nest CLI
- **Testing:** Jest

## Frontend - Reference Implementation (apps/frontend)
- **Framework:** React (v19+)
- **State Management:** MobX (v6+) - used within the domain layer for reactivity
- **Networking:** ky - modern fetch-based HTTP client
- **UI Components:** Radix UI - unstyled primitives
- **Styling:** Vanilla Extract - zero-runtime CSS-in-TS
- **Build Tool:** Vite
- **Routing:** React Router (v7+)
- **Testing:** Vitest / Jest

## Future/Alternative Clients
- **Portability Goal:** The system is designed to allow the core Domain and Application layers to be reused across different delivery mechanisms, including:
    - Terminal User Interfaces (TUI)
    - Command Line Interfaces (CLI)
    - Alternative Web Frameworks (e.g., Vue, Angular)

## Code Quality & Tooling
- **Linting:** ESLint (Custom monorepo config)
- **Formatting:** Prettier
- **Configuration:** TypeScript Project References (via libs/typescript-config)
