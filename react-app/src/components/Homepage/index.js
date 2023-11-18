import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { get_all_songs } from '../../store/songs';
import { get_following } from '../../store/follows';
import SongCard from '../SongCard';
import './Homepage.css';

function Homepage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs);
  const following = useSelector(state => state.following);

  useEffect(() => {
    dispatch(get_all_songs())
  }, [dispatch])

  const recentSongsFromFollowing = () => {
    let comp = [];
    for (let song in songs) {
      const curr = songs[song]
      comp.push( <SongCard song={curr} /> )
    }
    return comp;
  }

  if (sessionUser) {
    return (
      <main>
        <div id='for-you'>
          <div id='following-songs-container'>
            {recentSongsFromFollowing()}
          </div>
          <div id='following'>
            <h2>Following</h2>
            <h2>You May Like</h2>
          </div>
        </div>
      </main>
    )
  }
  return (
    <main>
      Hello, Stranger
    </main>
  );
}

export default Homepage;