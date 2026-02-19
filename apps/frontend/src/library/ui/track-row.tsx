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
        <div className={ styles.titleWrapper }>
          <span className={ styles.title }>{ track.name }</span>
          <span className={ styles.duration }>{ track.formattedDuration }</span>
        </div>
        <div className={ styles.metadata }>
          { track.artists.join(', ') } | { track.albumName }
        </div>
      </div>
    </div>
  );
};