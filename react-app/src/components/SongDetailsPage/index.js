import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_songs, set_current } from '../../store/songs';
import OpenModalButton from "../OpenModalButton";
import './songdetails.css'

function SongDetailPage() {
  const id = +window.location.href.split('/')[4];
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const currentSong = useSelector(state => state.songs.songs[id]);
  const likes = useSelector(state => state.likes);

  const likeSong = () => {
    console.log('like/unlike song');
  }
  const isLiked = likes?.[currentSong.id] ? <i className='fas fa-heart fa-2x' onClick={likeSong}></i> : <i className='far fa-heart fa-2x' onClick={likeSong}></i>

  return (
    <main id='song-details'>
      <section className='sd-left'>
        <div className='sd-song'>
          <img src={currentSong?.image_url} alt='track image'></img>
          <div className='sds-right'>
            <h1>{currentSong?.name}</h1>
            <span className='sdsr-bot'>
              <p className='genre'>#{currentSong?.genre}</p>
              <span>
                user controls
                {isLiked}
              </span>
            </span>
          </div>
        </div>
        <div className='sd-comments'>
          Comment Form Here
          Comments Here
        </div>
      </section>
      <section className='sd-right'>
        <div className='sd-user'>

        </div>
        <div className='sd-songs'>
          Other Songs By User Here
        </div>
      </section>
    </main>
  )
}

export default SongDetailPage;