import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getOtherUser } from '../../store/session';
import { get_user_songs } from '../../store/songs';
import OpenModalButton from "../00_open_modal_button";
import PlaylistList from '../section_playlists';
import SongList from '../section_songs';
import MyFooter from '../section_footer';
import './playlistpage.css'

function PlaylistPage() {
  return (
    <main id='playlist-details'>
      <section>
        <div className='playlist-details'>
          <img></img>
          <h2>Title Here</h2>
          <p>Description Time</p>
        </div>
        <div className='playlist-songs'>
          <p>uwu</p>
          <p>uwu</p>
          <p>uwu</p>
          <p>uwu</p>
        </div>
      </section>
    </main>
  )
}

export default PlaylistPage;