# Implementation Plan - Architecture Stress Test: Cross-Module Playback

## Phase 1: Shared Event Infrastructure [checkpoint: e2ac2ba]
Goal: Setup the communication channel between modules.

- [x] Task: Install mitt and Setup UIEventBus [6bc56ed]
    - [ ] Install `mitt` in frontend
    - [ ] Create `@shared/events` with typed event definitions
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Backend Streaming Implementation [checkpoint: fb3f492]
Goal: Implement the ability to stream audio data via HTTP.

- [x] Task: Create Streaming Module and Use Case [e358c3b]
    - [ ] Define `StreamingPort` and domain logic
    - [ ] Implement `StreamTrackUseCase`
- [x] Task: Implement Streaming Controller [bd5f957]
    - [ ] Create `GET /streaming/:trackId` endpoint
    - [ ] Pipe data from Use Case to Response
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Frontend Player implementation
Goal: Create the player module that reacts to events.

- [x] Task: Implement PlayerStore [ebdaf30]
    - [ ] Create `PlayerStore` listening to `UIEventBus`
- [x] Task: Create PlayerView Component [ec71af6]
    - [ ] Implement UI using Radix/Vanilla Extract
    - [ ] Connect to store and `<audio>` element
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Cross-Module Integration
Goal: Connect the library click to the player.

- [ ] Task: Emit Event from TrackRow [ ]
    - [ ] Update `TrackRow` to emit `track:play` via `UIEventBus`
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
