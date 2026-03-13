# Product Guidelines

## Documentation & Communication
- **Tone & Style:** Technical and precise. Focus on architectural clarity and exact terminology.
- **No Inline Comments:** A strict rule against comments within the source code. All explanations must reside in external documentation.
- **Format:** Obsidian-flavored Markdown.
- **Location:** Centralized documentation in `docs/` and project context in `conductor/`.

## UI & UX Principles
- **Aesthetic:** Clean and minimalist. prioritize structural clarity.
- **Framework Agnostic:** Core business logic must be decoupled from UI frameworks.
- **Utility First:** Focus on demonstrating domain logic and portability.

## Architectural Integrity
- **Explicit over Implicit**: Prefer clear structures that reveal architectural patterns (Clean Architecture, DDD).
- **Standardized Skills**: Use specialized AI skills for development:
    - `nest-hexagonal-architect` (Backend structure)
    - `frontend-vertical-slices` (Frontend structure)
    - `ddd-rich-model-expert` (Business logic)
    - `testing-trophy-strategy` (Quality assurance)
- **Automated Guardrails**: Use `dependency-cruiser` to enforce layer boundaries.
- **Portability**: Core business logic must be strictly decoupled from infrastructure to support various clients (Web, TUI, CLI).
