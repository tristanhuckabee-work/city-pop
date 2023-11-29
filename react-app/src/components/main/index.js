import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_songs } from '../../store/songs';
import { get_following, get_recommended } from '../../store/follows';
import { getOtherUser } from '../../store/session';

import SongList         from '../section_songs';
import SideBar          from '../section_aside';
import Footer           from '../section_footer';

import './homepage.css';

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
          <section className='main-left'>
            <SongList />
          </section>
          <section className='main-right'>
            <SideBar user={false} follow={true} rFollows={true} rSongs={false} />
          </section>
        </main>
      </>
    )
  }
  return (
    <>
      <main>
        Hello, Stranger
      </main>
    </>
  );
}

export default Main;