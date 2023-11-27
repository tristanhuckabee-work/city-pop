import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SongCard        from '../card_song';

import './songList.css';

function SongList() {
  const songs = useSelector(state => state?.songs.songs);

  const formatSongs = () => {
    let comp = [];
    for (let song in songs) {
      const curr = songs[song]
      comp.push(
        <SongCard
          key={`song-card-${curr.id}`}
          song={curr}
        />
      )
    }
    return comp;
  }

  return (
    <section id='songs-container'>
      {formatSongs()}
    </section>
  )
}

export default SongList;