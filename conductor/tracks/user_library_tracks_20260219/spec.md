# Track Specification - User Library: Saved Tracks

## Overview
Implement the "User Library" feature, specifically displaying the user's saved tracks (liked songs) on the Home Page. The implementation will follow the project's Clean Architecture and DDD principles, utilizing infinite scrolling for data retrieval and rich domain modeling.

## Functional Requirements
- **Backend:**
    - Create a new `library` module.
    - Implement a `GET /library/tracks` endpoint that supports pagination (offset/limit).
    - Integrate with Spotify's `GET /me/tracks` API.
    - Map Spotify track data to a internal `Track` domain entity.
    - Use typed Value Objects (`TrackId`, `UserId`, `Time`) for domain attributes.
- **Frontend:**
    - Create a `library` module in the frontend.
    - Define a `Track` model and a `LibraryDataStore` (MobX) to manage the list of tracks and pagination state.
    - Implement a `GetSavedTracksCase` use case to handle data fetching.
    - Create UI components:
        - `TrackRow`: Displays individual track info (thumbnail, title, artist, album, duration).
        - `TrackList`: Renders the list and handles infinite scroll logic.
    - Update `HomePage` to include the `TrackList`.
    - Enrich `Track` domain model with display logic and formatting via `Time` VO.

## Non-Functional Requirements
- **Port/Adapter Pattern:** Strict separation of API integration (Adapters) and Domain/Application logic.
- **Styling:** Use Vanilla Extract for all component styles, following the established theme tokens.
- **Reactivity:** Use MobX for managing the tracks list and loading states.
- **Performance:** Efficient rendering of long lists via infinite scroll.
- **Type Safety:** Avoid primitive obsession by using typed Value Objects for identifiers and domain values.

## Acceptance Criteria
- [x] The Home Page displays a list of the user's saved tracks.
- [x] Each track item displays: Album Cover Thumbnail, Track Name, Artist Name(s) | Album Name, and Duration.
- [x] Scrolling to the bottom of the list automatically triggers a fetch for the next page of tracks.
- [x] A loading indicator is shown while fetching the initial page and subsequent pages.
- [x] The implementation passes all unit tests for domain entities, value objects, and use cases.
- [x] All styles are moved to `.css.ts` files (no inline styles).

## Out of Scope
- Playback functionality (Play/Pause).
- Clickable artists or albums (navigating to details pages).
- Search or filtering within the saved tracks list.