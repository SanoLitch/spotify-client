import {
  useEffect, useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import * as styles from './player-view.css';
import { playerRootStore } from '../domain';

export const PlayerView = observer(() => {
  const { data } = playerRootStore;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (data.isPlaying) {
      audioRef.current.load(); // Ensure the new src is loaded
      audioRef.current.play().catch(err => {
        console.warn('Auto-play blocked or stream error:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [data.isPlaying, data.currentTrackId]);

  if (!data.currentTrackId) {
    return null;
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.trackInfo }>
        <span className={ styles.trackName }>{ data.trackName }</span>
        <span className={ styles.artistName }>{ data.artistName }</span>
      </div>

      <div className={ styles.controls }>
        <audio
          ref={ audioRef }
          controls
          src={ data.streamUrl || undefined }
          className={ styles.audio }
          onPlay={ () => data.setPlaying(true) }
          onPause={ () => data.setPlaying(false) }
        />
      </div>

      <div style={ { width: '30%' } } />
      {' '}
      {/* Spacer */}
    </div>
  );
});
