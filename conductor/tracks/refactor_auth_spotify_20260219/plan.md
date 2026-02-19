# Implementation Plan - Refactor Authentication and Spotify API Integration

## Phase 1: Backend Domain and Application Layers [checkpoint: 941ceed]
Goal: Define the core business logic and interfaces for authentication.

- [x] Task: Define Auth Domain Entities and Port Interfaces [70cef07]
    - [ ] Write tests for `User` entity and domain logic
    - [ ] Implement `User` entity and `AuthProvider` / `UserRepository` interfaces
- [x] Task: Implement Authentication Use Cases [97bf65e]
    - [ ] Write tests for `LoginUseCase` and `LogoutUseCase`
    - [ ] Implement Use Cases orchestrating the ports
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Backend Domain and Application Layers' (Protocol in workflow.md)

## Phase 2: Backend Infrastructure and API Layers [checkpoint: 954fd67]
Goal: Implement the concrete Spotify integration and API endpoints.

- [x] Task: Implement Spotify Auth Adapter [ea0a653]
    - [ ] Write tests for `SpotifyAuthProvider` (using mocks for Spotify API)
    - [ ] Implement `SpotifyAuthProvider` in the infrastructure layer
- [x] Task: Refactor Auth Controller [b79f320]
    - [ ] Write tests for `AuthController`
    - [ ] Refactor Controller to use Use Cases instead of direct service calls
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Backend Infrastructure and API Layers' (Protocol in workflow.md)

## Phase 3: Frontend Domain and Application Layers [checkpoint: 20f64b0]
Goal: Structure the frontend authentication logic into reactive stores and use cases.

- [x] Task: Define Frontend Auth Stores (MobX) [9cd300d]
    - [ ] Write tests for `AuthDataStore`
    - [ ] Implement `AuthDataStore` and `AuthRootStore`
- [x] Task: Implement Frontend Auth Use Cases [dc18fff -> 9dcdba5]
    - [ ] Write tests for `LoginUseCase` (frontend)
    - [ ] Implement Use Cases interacting with the stores
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend Domain and Application Layers' (Protocol in workflow.md)

## Phase 4: Frontend Infrastructure and UI Integration
Goal: Connect to the backend API and update the UI.

- [x] Task: Implement Frontend Auth API Adapter [1dd648c]
    - [ ] Write tests for `SpotifyAuthApi` adapter
    - [ ] Implement adapter implementing the `AuthApiPort`
- [ ] Task: Integrate with React Components
    - [ ] Refactor `LoginPage` and `App` to use the new Use Cases/Stores
    - [ ] Verify the end-to-end OAuth2 flow
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Frontend Infrastructure and UI Integration' (Protocol in workflow.md)
