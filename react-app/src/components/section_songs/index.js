import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_my_likes } from '../../store/likes';
import SongCard        from '../card_song';

import './songList.css';

function SongList({songs}) {
  const dispatch = useDispatch();
  const stateSongs = useSelector(state => state?.songs.songs);
  if (!songs) songs = stateSongs;

  useEffect(() => {
    dispatch(get_my_likes());
  }, [dispatch])

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
      <h2>Click to Play</h2>
      {formatSongs()}
    </section>
  )
}

export default SongList;