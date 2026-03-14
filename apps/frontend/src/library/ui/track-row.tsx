import { uiEventBus } from '@shared/events';
import * as styles from './track-row.css';
import { Track } from '../domain/track.model';

export interface TrackRowProps {
  track: Track;
}

/**
 * TrackRow component displays a single track in the library list.
 *
 * @param props - Component properties
 * @param props.track - The track entity to display
 *
 * @fires track:play - Emitted via UIEventBus when the row is clicked
 */
export const TrackRow = ({ track }: TrackRowProps) => {
  const handleClick = () => {
    uiEventBus.emit('track:play', {
      trackId: track.id.getValue(),
      trackName: track.name,
      artistName: track.artists[0] || 'Unknown Artist',
    });
  };

  return (
    <div className={ styles.row } onClick={ handleClick }>
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
          { track.displayMetadata }
        </div>
      </div>
    </div>
  );
};
