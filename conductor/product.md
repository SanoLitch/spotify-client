# Initial Concept
Spotify client example using modern NestJS/React monorepo.

# Product Definition

## Target Audience
- Developers looking for a high-quality example of a modern NestJS/React monorepo implementation.
- Engineers interested in learning how to apply Clean Architecture and Domain-Driven Design (DDD) principles in a full-stack TypeScript environment.

## Primary Goals
- Showcase a production-grade implementation of Clean Architecture and DDD.
- **Architectural Portability:** Extract and encapsulate core business logic into framework-agnostic layers, enabling the rapid development of alternative clients (e.g., other web frameworks, TUI, or CLI).
- Demonstrate best practices in AI-driven development by strictly adhering to established project rules and guidelines.
- Provide a robust, well-tested, and well-documented reference codebase for the developer community.

## Key Features
- **Robust Authentication:** Implementation of Spotify OAuth2 flow to handle secure user access.
- **Framework-Agnostic Core:** Decoupled domain and application layers that can be shared across different frontend implementations.
- **DDD Backend Implementation:** A backend structured around domain entities, use cases, and repositories, separating business logic from infrastructure.

## Project Guidelines
- **Strict Rule Adherence:** Absolute compliance with `be-rules.md` and `fe-rules.md` to ensure architectural integrity.
- **Quality Assurance:** Maintenance of comprehensive unit and E2E testing suites for all core functionality.
- **Architectural Documentation:** Clear and extensive documentation of patterns, decisions, and system structure.

## Technical Constraints & Requirements
- **Best Practices Focus:** The project prioritizes the demonstration of optimal coding standards and architectural patterns over feature quantity.
- **Decoupled Logic:** Strict separation of UI (React) from business logic to maintain the portability of the core application.
- **AI-Driven Workflow:** Development is centered around a disciplined approach to AI-assisted coding, ensuring consistency and reliability across the codebase.