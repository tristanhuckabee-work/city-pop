import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_songs } from '../../store/songs';
import { get_following, get_recommended } from '../../store/follows';
import { get_my_likes } from '../../store/likes';
import { getOtherUser } from '../../store/session';

import SongList from '../section_songs';
import SideBar from '../section_aside';
import Footer from '../section_footer';

import './homepage.css';

function Main() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(get_all_songs());
    dispatch(get_following());
    dispatch(get_my_likes());
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
      <section id='splash-header'>
        <h2>Hello Stranger,</h2>
        <p>This is a portfolio project for uploading and listening to music by Tristan Huckabee.</p>
        <div id='splash-cards'>
          <article className='splash-card'>
            <h3>Technologies</h3>
            <hr></hr>
            <p>SQLite3 Database</p>
            <p>Flask Back-End</p>
            <p>React Front-End</p>
            <p>Node Runtime Environment</p>
            <br></br>
            <p>Render.com for Deployment</p>
            <p>Cloudinary API for Asset Management</p>
            <p>Git for Versioning</p>
          </article>
          <article className='splash-card'>
            <h3>Features</h3>
            <hr></hr>
            <p>Upload Songs via File or URL</p>
            <p>Comments on Songs</p>
            <p>Like/Unlike Songs</p>
            <p>Follow/Unfollow other Users</p>
            <br></br>
            <p>Search for Users and Songs.</p>
            <p>Algorithms to recommend artists or songs similar to your interest!</p>
          </article>
          <article className='splash-card'>
            <h3>In The Future...</h3>
            <hr></hr>
            <p>Playlists : Auto-play Multiple Songs</p>
            <p>Prioritize songs from followed accounts on user's Feed.</p>
            <p>Improve recommendation algorithms.</p>
            <br></br>
            <p>Improve Responsiveness</p>
            <p>Audio Visualizer?</p>
          </article>
        </div>
      </section>
    </>
  );
}

export default Main;