import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { delete_song, get_one_song } from '../../store/songs';
import SideBar from '../section_aside';
import CommentList from '../section_comment';
import CommentForm from '../form_comment';
import './songdetails.css'
import EditSongForm from '../form_song_edit';

function SongDetails() {
  const id = +window.location.href.split('/')[4];
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.songs.songs);
  const current = useSelector(state => state.songs.songs[id]);
  const likes = useSelector(state => state.likes);

  const [currentSong, setCurrentSong] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const userOpts = currentSong?.user.id == sessionUser?.id;
  const userSongs = [];
  for (let key in songs) {
    const song = songs[key];
    userSongs.push(song);
  }
  useEffect(() => {
    dispatch(get_one_song(id))
    .then(res => {
      setCurrentSong(res);
    });
  }, [dispatch, current]);
  
  const likeSong = () => {
    console.log('like/unlike song');
  }
  const isLiked = likes?.[currentSong.id] ? <i className='fas fa-heart fa-2x' onClick={likeSong}></i> : <i className='far fa-heart fa-2x' onClick={likeSong}></i>
  const handleDelete = async e => {
    e.stopPropagation();

    await dispatch(delete_song(id));
    history.push('/');
  }
  return (
    <>
      <main>
        <section className='main-left'>
          <div id='song-details'>
            <img src={currentSong?.image_url} alt='track image'></img>
            <div id='sd-right'>
              <h1>{currentSong?.name}</h1>
            </div>
            <div className='userOptions'>
              {userOpts && (
                <span className='sd-user-opts'>
                  <i className='fas fa-delete-left fa-2x'
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowEdit(false);
                      setShowDelete(!showDelete);
                    }}
                  ></i>
                  <i className='fas fa-pen-to-square fa-2x'
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowDelete(false);
                      setShowEdit(!showEdit);
                    }}
                  ></i>
                </span>
              )}
              {isLiked}
            </div>
          </div>
          {showDelete && (
            <div className='sd-song-delete'>
              <p>Are You Sure?</p>
              <button onClick={e => handleDelete(e)}>Yes</button>
              <button onClick={(e) => {
                e.stopPropagation();
                setShowDelete(false)
              }}
              >No</button>
            </div>
          )}
          {showEdit && <EditSongForm func={setShowEdit} currentSong={currentSong} />}
          <CommentForm song_id={id} />
          <CommentList song_id={id} />
        </section>
        <section className='main-right'>
          <SideBar user={currentSong?.user} follow={false} rFollows={false} rSongs={true} />
        </section>
      </main>
    </>
  )
}

export default SongDetails;