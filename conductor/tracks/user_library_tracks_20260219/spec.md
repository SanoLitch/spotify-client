# Track Specification - User Library: Saved Tracks

## Overview
Implement the "User Library" feature, specifically displaying the user's saved tracks (liked songs) on the Home Page. The implementation will follow the project's Clean Architecture and DDD principles, utilizing infinite scrolling for data retrieval.

## Functional Requirements
- **Backend:**
    - Create a new `library` module.
    - Implement a `GET /library/tracks` endpoint that supports pagination (offset/limit).
    - Integrate with Spotify's `GET /me/tracks` API.
    - Map Spotify track data to a internal `Track` domain entity.
- **Frontend:**
    - Create a `library` module in the frontend.
    - Define a `Track` model and a `LibraryDataStore` (MobX) to manage the list of tracks and pagination state.
    - Implement a `GetSavedTracksCase` use case to handle data fetching.
    - Create UI components:
        - `TrackRow`: Displays individual track info (thumbnail, title, artist, album, duration).
        - `TrackList`: Renders the list and handles infinite scroll logic.
    - Update `HomePage` to include the `TrackList`.

## Non-Functional Requirements
- **Port/Adapter Pattern:** Strict separation of API integration (Adapters) and Domain/Application logic.
- **Styling:** Use Vanilla Extract for all component styles, following the established theme tokens.
- **Reactivity:** Use MobX for managing the tracks list and loading states.
- **Performance:** Efficient rendering of long lists (consider virtualization if the list grows very large, though infinite scroll is the primary focus).

## Acceptance Criteria
- [ ] The Home Page displays a list of the user's saved tracks.
- [ ] Each track item displays: Album Cover Thumbnail, Track Name, Artist Name(s), Album Name, and Duration (mm:ss).
- [ ] Scrolling to the bottom of the list automatically triggers a fetch for the next page of tracks.
- [ ] A loading indicator is shown while fetching the initial page and subsequent pages.
- [ ] The implementation passes all unit tests for domain entities and use cases.

## Out of Scope
- Playback functionality (Play/Pause).
- Clickable artists or albums (navigating to details pages).
- Search or filtering within the saved tracks list.
