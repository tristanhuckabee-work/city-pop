import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import OpenModalButton from "../OpenModalButton";
import SongCard from '../SongCard';
import './Homepage.css';

function FollowSongs() {
  const songs = useSelector(state => state?.songs);

  const recentSongsFromFollowing = () => {
    let comp = [];
    for (let song in songs) {
      const curr = songs[song]
      comp.push(<SongCard key={`song-card-${curr.id}`} song={curr} />)
    }
    return comp;
  }

  return (
    <div id='following-songs-container'>
      {recentSongsFromFollowing()}
    </div>
  )
}

export default FollowSongs;