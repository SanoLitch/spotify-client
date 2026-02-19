import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { libraryRootStore } from '../domain';
import { TrackRow } from './track-row';
import * as styles from './track-list.css';

export const TrackList = observer(() => {
  const { data, getSavedTracksCase } = libraryRootStore;
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial load
    getSavedTracksCase.execute();
  }, [getSavedTracksCase]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data.hasMore && !data.isLoading) {
          getSavedTracksCase.execute();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [data.hasMore, data.isLoading, getSavedTracksCase]);

  return (
    <div className={ styles.listContainer }>
      <div className={ styles.header }>
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span style={{ textAlign: 'right' }}>Time</span>
      </div>

      { data.tracks.map((track) => (
        <TrackRow key={ track.id } track={ track } />
      )) }

      <div ref={ sentinelRef } className={ styles.sentinel }>
        { data.isLoading && <div className={ styles.loading }>Loading tracks...</div> }
      </div>
    </div>
  );
});
