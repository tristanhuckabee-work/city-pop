import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { delete_song, set_current } from '../../store/songs';
import { create_like, get_my_likes, update_like } from '../../store/likes';
import OpenModalButton from "../00_open_modal_button";
import EditSongForm from "../form_song_edit";
import './songcard.css'

function SongCard({ song }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultIMG = "https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png";

  const sessionUser = useSelector(state => state.session.user);
  const songPlaying = useSelector(state => state.songs.currentSong);
  const likes = useSelector(state => state.likes);

  const [trackURL, setTrackURL] = useState(song?.image_url);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(true);

  const isPlaying = song?.id === songPlaying?.id;
  const userOpts = song?.user?.id === sessionUser?.id;

  const deleteButton = (e) => {
    if (deleteConfirm) {
      return (
        <span className='delConf'>
          <p>Are You Sure?</p>
          <button onClick={e => deleteSong(e)}>Yes</button>
          <button onClick={(e) => {
            e.stopPropagation();
            setDeleteConfirm(false)
          }}
          >No</button>
        </span>
      )
    }
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDeleteConfirm(true);
        }}
      >DELETE</button>
    )
  }
  const likeSong = async (e) => {
    e.preventDefault()
    e.stopPropagation();

    if (song?.id in likes) {
      const { isLiked, ...payload } = likes[song.id];
      await dispatch(update_like(payload));
    } else {
      const payload = {
        user_id: sessionUser.id,
        song_id: song.id
      }
      await dispatch(create_like(payload));
    }
  }
  const isLiked = likes?.[song?.id] && likes[song?.id].isLiked ? <i className='fas fa-heart' onClick={e => likeSong(e)}></i> : <i className='far fa-heart' onClick={e => likeSong(e)}></i>
  const handleSongClick = () => {
    dispatch(set_current(song));
    if (sessionUser) {
      history.push({
        pathname: `/songs/${song.id}`,
        state: song
      });
    }
  }
  const addToPlaylist = e => {
    e.stopPropagation();
    console.log('Add to Playlist');
  }
  const deleteSong = async (e) => {
    e.stopPropagation();

    await dispatch(delete_song(song?.id));
  }
  const editSong = e => {
    e.stopPropagation();
    console.log('Go To Edit Song Form');
  }

  return (
    <div
      className={`song-card ${isPlaying ? 'sc-highlite' : ''}`}
      key={`song-card-${song}`}
      onClick={handleSongClick}
    >
      <img onError={() => setTrackURL(defaultIMG)} src={trackURL} alt='track cover'></img>
      <div className='song-card-info'>
        <h3>{song.name}</h3>
        <p
          className='user-page-link'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push(`/users/${song.user.id}`)
          }}
        >{song.user?.username}</p>
        <span className='sc-bot'>
          <p>#{song.genre}</p>
          <div className='song-actions'>
            <i
              className='fas fa-square-plus'
              onClick={e => addToPlaylist(e)}
            ></i>
            {isLiked}
            {userOpts && (
              <span className='sc-user-actions'
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault()
                }}
              >
                {deleteButton()}
                <OpenModalButton
                  buttonText='EDIT'
                  modalComponent={(
                    <div id='esm-container'>
                      <EditSongForm currentSong={song} />
                    </div>
                  )}
                />
              </span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}

export default SongCard;