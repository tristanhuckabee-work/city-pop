import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import OpenModalButton from "../OpenModalButton";
import SongCard from '../SongCard';
import { set_current } from '../../store/songs';
import './Homepage.css';

function FollowSongs() {
  const dispatch = useDispatch();
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
    <div id='songs-container'>
      {formatSongs()}
    </div>
  )
}

export default FollowSongs;