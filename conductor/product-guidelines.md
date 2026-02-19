# Product Guidelines

## Documentation & Communication
- **Tone & Style:** Technical and precise. Focus on architectural clarity, pattern descriptions, and exact technical terminology.
- **No Inline Comments:** A strict rule against comments within the source code. All explanations, rationales, and technical details must reside in the external documentation.
- **Format:** All documentation must be written in Obsidian-flavored Markdown to support rich linking and knowledge management.
- **Location:** Centralized documentation and Architectural Decision Records (ADRs) are maintained in the `docs/` directory.

## UI & UX Principles
- **Aesthetic:** Clean and minimalist. The UI should prioritize structural clarity to ensure the architectural patterns remain the primary focus.
- **Framework Agnostic:** Avoid tight coupling to any specific UI framework (e.g., Material UI). The UI layer must be easily replaceable without affecting the core business logic.
- **Utility First:** Design should be functional and serve primarily to demonstrate the underlying domain logic and portability of the core layers.

## Architectural Integrity
- **Explicit over Implicit:** Prefer clear, explicit code structures that reveal the underlying architectural patterns (Clean Architecture, DDD), even if it results in more verbose code.
- **Standardized Patterns:** Cross-cutting concerns like logging and error handling must follow documented, standardized patterns applied consistently across all system layers.
- **Portability:** Core business logic (Domain and Application layers) must be strictly decoupled from infrastructure and delivery mechanisms to support various client implementations (Web, TUI, CLI).
