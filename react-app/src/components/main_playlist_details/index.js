import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getOtherUser } from '../../store/session';
import { get_user_songs } from '../../store/songs';
import OpenModalButton from "../00_open_modal_button";
import { get_one_playlist } from '../../store/playlists';
import SongList from '../section_songs';
import MyFooter from '../section_footer';
import './playlistpage.css'

function PlaylistPage() {
  const id = +window.location.href.split('/')[4];
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const playlist = useSelector(state => state.playlists);

  useEffect(() => {
    dispatch(get_one_playlist(id));
  }, [dispatch]);

  return (
    <main id='playlist-details'>
      <section>
        <div className='playlist-details'>
          <img src={playlist.image_url}></img>
          <h2>{playlist.name} by <span
              className='user-page-link'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                history.push(`/users/${playlist?.user?.id}`)
              }}
            >
              {playlist?.user?.username}
            </span>
          </h2>
          <p>{playlist.description}</p>
        </div>
        <div className='playlist-songs'>
          <SongList songs={playlist.songs}/>
          {/* <SongList songs={playlist.songs}/> */}
        </div>
      </section>
    </main>
  )
}

export default PlaylistPage;