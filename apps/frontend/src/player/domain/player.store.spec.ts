import {
  describe, it, expect, beforeEach, afterEach,
} from 'vitest';
import { uiEventBus } from '@shared/events';
import { PlayerStore } from './player.store';

describe('PlayerStore', () => {
  let store: PlayerStore;

  beforeEach(() => {
    store = new PlayerStore();
  });

  afterEach(() => {
    store.dispose();
  });

  it('should initialize with empty state', () => {
    expect(store.currentTrackId).toBe(null);
    expect(store.isPlaying).toBe(false);
  });

  it('should update state when track:play event is emitted', () => {
    const eventData = {
      trackId: '123',
      trackName: 'Test',
      artistName: 'Artist',
    };

    uiEventBus.emit('track:play', eventData);

    expect(store.currentTrackId).toBe('123');
    expect(store.isPlaying).toBe(true);
    expect(store.trackName).toBe('Test');
    expect(store.artistName).toBe('Artist');
  });

  it('should handle pause and resume', () => {
    // 1. Set up state via track:play
    uiEventBus.emit('track:play', {
      trackId: '123',
      trackName: 'T',
      artistName: 'A',
    });
    expect(store.isPlaying).toBe(true);

    // 2. Pause
    uiEventBus.emit('track:pause');
    expect(store.isPlaying).toBe(false);

    // 3. Resume
    uiEventBus.emit('track:resume');
    expect(store.isPlaying).toBe(true);
  });
});
