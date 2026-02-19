import { Track } from '../domain/track.model';
import * as styles from './track-row.css';

export interface TrackRowProps {
  track: Track;
}

export const TrackRow = ({ track }: TrackRowProps) => {
  return (
    <div className={ styles.row }>
      <img
        src={ track.albumCoverUrl }
        alt={ track.albumName }
        className={ styles.cover }
      />
      <div className={ styles.mainInfo }>
        <span className={ styles.title }>{ track.name }</span>
        <span className={ styles.artist }>{ track.artists.join(', ') }</span>
      </div>
      <div className={ styles.album }>
        { track.albumName }
      </div>
      <div className={ styles.duration }>
        { track.formattedDuration }
      </div>
    </div>
  );
};
