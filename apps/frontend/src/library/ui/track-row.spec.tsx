import {
  describe, it, expect, vi,
} from 'vitest';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { uiEventBus } from '@shared/events';
import { TrackRow } from './track-row';
import { Track } from '../domain/track.model';

// Mock the event bus
vi.mock('@shared/events', () => ({
  uiEventBus: {
    emit: vi.fn(),
  },
}));

describe('TrackRow', () => {
  const mockTrack = Track.create({
    id: 'track-1',
    name: 'Test Track',
    artists: ['Artist 1'],
    albumName: 'Test Album',
    durationMs: 180000,
    albumCoverUrl: 'http://example.com/cover.jpg',
  });

  it('should render track information', () => {
    render(<TrackRow track={ mockTrack } />);

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Artist 1 | Test Album')).toBeInTheDocument();
  });

  it('should emit track:play event when clicked', async () => {
    const user = userEvent.setup();

    render(<TrackRow track={ mockTrack } />);

    const row = screen.getByText('Test Track').closest('div');

    await user.click(row!);

    expect(uiEventBus.emit).toHaveBeenCalledWith('track:play', {
      trackId: 'track-1',
      trackName: 'Test Track',
      artistName: 'Artist 1',
    });
  });
});
