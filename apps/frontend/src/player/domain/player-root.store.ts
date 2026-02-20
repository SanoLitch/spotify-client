import { PlayerStore } from './player.store';

export class PlayerRootStore {
  public readonly data: PlayerStore;

  constructor() {
    this.data = new PlayerStore();
  }
}

export const playerRootStore = new PlayerRootStore();
