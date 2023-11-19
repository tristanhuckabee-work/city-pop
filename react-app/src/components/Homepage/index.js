import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { get_all_songs } from '../../store/songs';
import { get_following, get_recommended } from '../../store/follows';
import SongCard from '../SongCard';
import UserCard from '../UserCard';
import './Homepage.css';

function Homepage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs);
  const following = useSelector(state => state.follows.following);
  const recommended=useSelector(state => state.follows.recommended);

  useEffect(() => {
    dispatch(get_all_songs());
    dispatch(get_following());
    dispatch(get_recommended());
  }, [dispatch])

  const recentSongsFromFollowing = () => {
    let comp = [];
    for (let song in songs) {
      const curr = songs[song]
      comp.push( <SongCard song={curr} /> )
    }
    return comp;
  }
  const followingList = () => {
    let comp = [];
    for (let follow in following) {
      const curr = following[follow];
      comp.push( <UserCard user={curr.user} status={curr.isFollowed} /> );
    }
    return comp;
  }
  const recommendList = () => {
    let comp = [];
    for (let follow in recommended) {
      const curr = recommended[follow];
      comp.push( <UserCard user={curr} /> );
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
          <aside id='following'>
            <h2>Following</h2>
            {followingList()}
            <h2>Recommended</h2>
            {recommendList()}
          </aside>
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