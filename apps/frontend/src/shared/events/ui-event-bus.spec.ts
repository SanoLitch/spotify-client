import {
  describe, it, expect, vi,
} from 'vitest';
import { uiEventBus } from './ui-event-bus';

describe('UIEventBus', () => {
  it('should emit and listen to track:play event', () => {
    const handler = vi.fn();
    const eventData = {
      trackId: '123',
      trackName: 'Test',
      artistName: 'Artist',
    };

    uiEventBus.on('track:play', handler);
    uiEventBus.emit('track:play', eventData);

    expect(handler).toHaveBeenCalledWith(eventData);
    uiEventBus.off('track:play', handler);
  });
});
