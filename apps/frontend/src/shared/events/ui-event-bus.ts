import mitt from 'mitt';

export interface UIEvents {
  'track:play': {
    trackId: string;
    trackName: string;
    artistName: string;
  };
  'track:pause': void;
  'track:resume': void;
}

export const uiEventBus = mitt<UIEvents>();
