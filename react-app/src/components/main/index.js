import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_songs } from '../../store/songs';
import { get_following, get_recommended } from '../../store/follows';
import { getOtherUser } from '../../store/session';
// import OpenModalButton from "../00_open_modal_button";
import SongList from '../section_songs';
import FollowingAside from './03_Sidebar';

import './homepage.css';
import Footer from '../section_footer';

function Main() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(get_all_songs());
    dispatch(get_following());
    dispatch(get_recommended());
    dispatch(getOtherUser(null));
  }, [dispatch])


  if (sessionUser) {
    return (
      <>
        <main>
          <section id='homepage-songs'>
            <SongList />
          </section>
          <FollowingAside />
        </main>
        <Footer parent='main-page' />
      </>
    )
  }
  return (
    <>
      <main>
        Hello, Stranger
      </main>
      <Footer parent='splash-page' />
    </>
  );
}

export default Main;