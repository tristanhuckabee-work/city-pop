import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { delete_song, get_all_songs, set_current } from '../../store/songs';
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

  const isPlaying = song?.id == songPlaying?.id;
  const userOpts = song?.user.id == sessionUser?.id;

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
      <i
        className='fa-solid fa-delete-left'
        onClick={(e) => {
          e.stopPropagation();
          setDeleteConfirm(true);
        }}
      ></i>
    )
  }
  const likeSong = (e) => {
    e.stopPropagation();
    console.log('like/unlike song');
  }
  const isLiked = likes?.[song?.id] ? <i className='fas fa-heart' onClick={e => likeSong(e)}></i> : <i className='far fa-heart' onClick={e => likeSong(e)}></i>
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
    
    const res = await dispatch(delete_song(song?.id));
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
      <img onError={() => setTrackURL(defaultIMG)} src={trackURL} alt='track image'></img>
      <div className='song-card-info'>
        <h3>{song.name}</h3>
        <p>{song.user.username}</p>
        <span className='sc-bot'>
          <p>#{song.genre}</p>
          <div className='song-actions'>
            <i
              className='fas fa-square-plus'
              onClick={e => addToPlaylist(e)}
            ></i>
            {isLiked}
            {userOpts && (
              <span className='sc-user-actions'>
                {deleteButton()}
                <i
                  className='fas fa-pen-to-square'
                  onClick={e => editSong(e)}
                ></i>
              </span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
}

export default SongCard;