import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlaylistCard        from '../card_playlist';

import './playlistList.css';

function PlaylistList({ playlists }) {
  const statePlaylists = useSelector(state => state?.playlists?.playlists);
  if (!playlists) playlists = statePlaylists;

  const formatPlaylists = () => {
    let comp = [];
    for (let playlist in playlists) {
      const curr = playlists[playlist]
      comp.push(
        <PlaylistCard
          key={`playlist-card-${curr.id}`}
          playlist={curr}
        />
        // <p>dink</p>
      )
    }
    return comp;
  }

  return (
    <section id='playlists-container'>
      {formatPlaylists()}
    </section>
  )
}

export default PlaylistList;