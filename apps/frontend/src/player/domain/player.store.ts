import { makeAutoObservable } from 'mobx';
import { uiEventBus } from '@shared/events';

export class PlayerStore {
  public currentTrackId: string | null = null;
  public trackName: string | null = null;
  public artistName: string | null = null;
  public isPlaying: boolean = false;

  private readonly handlers = {
    play: (data: { trackId: string; trackName: string; artistName: string }) => {
      this.currentTrackId = data.trackId;
      this.trackName = data.trackName;
      this.artistName = data.artistName;
      this.isPlaying = true;
    },
    pause: () => {
      this.isPlaying = false;
    },
    resume: () => {
      if (this.currentTrackId) {
        this.isPlaying = true;
      }
    },
  };

  constructor() {
    makeAutoObservable(this);
    this.setupSubscriptions();
  }

  private setupSubscriptions(): void {
    uiEventBus.on('track:play', this.handlers.play);
    uiEventBus.on('track:pause', this.handlers.pause);
    uiEventBus.on('track:resume', this.handlers.resume);
  }

  public dispose(): void {
    uiEventBus.off('track:play', this.handlers.play);
    uiEventBus.off('track:pause', this.handlers.pause);
    uiEventBus.off('track:resume', this.handlers.resume);
  }

  public setPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
  }

  public get streamUrl(): string | null {
    if (!this.currentTrackId) return null;
    return `/api/streaming/${ this.currentTrackId }`;
  }
}