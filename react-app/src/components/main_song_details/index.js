import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { get_all_songs, get_one_song } from '../../store/songs';
import { get_for_current } from '../../store/comments';
import MyFooter from '../section_footer';
import CommentList from '../section_comment';
import CommentForm from './form_comment';
import './songdetails.css'

function SongDetails() {
  const id = +window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs.songs);
  const likes = useSelector(state => state.likes);

  const [currentSong, setCurrentSong] = useState(null);
  const [cSongDate, setCSongDate] = useState(null);
  const userOpts = currentSong?.user.id == sessionUser?.id;
  const userSongs = [];
  for (let key in songs) {
    const song = songs[key];
    userSongs.push(song);
  }

  useEffect(() => {
    dispatch(get_one_song(id))
      .then(res => {
        setCurrentSong(res)
        setCSongDate(res.updated_at)
        return res;
      })
  }, [dispatch])

  const likeSong = () => {
    console.log('like/unlike song');
  }
  const isLiked = likes?.[currentSong.id] ? <i className='fas fa-heart fa-2x' onClick={likeSong}></i> : <i className='far fa-heart fa-2x' onClick={likeSong}></i>
  const formatDate = () => {
    if (cSongDate) {
      const months = ['Janua', 'Febru', 'March', 'April', 'May', 'June', 'July', 'Augus', 'Septe', 'Octob', 'Novem', 'Dec']
      const splitUp = cSongDate?.split(' ');
      const day = splitUp[1];
      let month = splitUp[2];
      months?.forEach((m, i) => {
        if (m.startsWith(month)) month = i;
      });
      const year = splitUp[3];
      return `${month} / ${day} / ${year}`;
    }


  }

  return (
    <>
      <main id='song-details'>
        <section className='sd-left'>
          <div className='sd-song'>
            <img src={currentSong?.image_url} alt='track image'></img>
            <div className='sds-right'>
              <h1>{currentSong?.name}</h1>
              <span className='sdsr-bot'>
                <span>
                  <p className='date'>{formatDate()}</p>
                  {userOpts && (
                    <span className='sd-user-opts'>
                      <i className='fas fa-delete-left fa-2x'></i>
                      <i className='fas fa-pen-to-square fa-2x'></i>
                    </span>
                  )}
                  {isLiked}
                </span>
              </span>
            </div>
          </div>
          <div className='sd-comments'>
            <CommentForm song_id={id} />
            <CommentList song_id={id} />
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
      <MyFooter parent='song-page' />
    </>
  )
}

export default SongDetails;