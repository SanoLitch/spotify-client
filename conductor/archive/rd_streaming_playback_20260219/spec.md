# Track Specification - Architecture Stress Test: Cross-Module Playback

## Overview
This R&D track aims to test the architecture's loose coupling and streaming capabilities. We will implement a flow where clicking a track in the Library module triggers playback in a separate Player module via a shared event bus, with the audio data streamed from the backend.

## Functional Requirements
- **Infrastructure (Shared):**
    - Setup `UIEventBus` using `mitt` in `@shared/events`.
    - Define types for UI events (e.g., `track:play`).
- **Backend (Streaming Module):**
    - Create a `GET /streaming/:trackId` endpoint.
    - Implementation must use `ReadableStream` to pipe audio data (HTTP Chunked encoding).
    - Domain layer should handle the "stream request" logic.
- **Frontend (Player Module):**
    - Create a `PlayerStore` (MobX) that listens to `UIEventBus`.
    - Implement a `PlayerView` (fixed footer) that reacts to store changes.
    - Use standard `<audio>` tag to consume the backend stream.
- **Integration:**
    - Update `TrackRow` in the Library module to emit a `track:play` event on click.

## Architecture & Stress Test Goals
- **Decoupling:** Verify that the Library module can trigger Player functionality without importing its stores or components.
- **Hexagonal Integrity:** Ensure the backend streaming maintains the Port/Adapter pattern despite using low-level stream APIs.
- **Reactive Chain:** Click (UI) -> Event Bus (Shared) -> Store (Module Domain) -> UI Update (Module View).
