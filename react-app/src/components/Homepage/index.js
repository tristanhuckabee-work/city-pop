import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { get_all_songs } from '../../store/songs';
import { get_following, get_recommended } from '../../store/follows';
import './Homepage.css';
import FollowingAside from './Following';
import FollowSongs from './FollowSongs';

function Homepage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(get_all_songs());
    dispatch(get_following());
    dispatch(get_recommended());
  }, [dispatch])

  if (sessionUser) {
    return (
      <main>
        <div id='for-you'>
          <FollowSongs />
          <FollowingAside />
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