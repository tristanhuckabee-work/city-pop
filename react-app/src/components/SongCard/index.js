import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { get_all_songs, set_current } from '../../store/songs';
import './songcard.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SongCard({ song }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultIMG = "https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png";
  
  const sessionUser = useSelector(state => state.session.user);
  const songPlaying = useSelector(state => state.songs.currentSong);
  const likes = useSelector(state => state.likes);
  
  const [trackURL, setTrackURL] = useState(song?.image_url);

  const isPlaying = song?.id == songPlaying?.id;
  const userOpts = song?.user.id == sessionUser?.id;
  const likeSong = () => {
    console.log('like/unlike song');
  }
  const isLiked = likes?.[song?.id] ? <i className='fas fa-heart' onClick={likeSong}></i> : <i className='far fa-heart' onClick={likeSong}></i>
  const handleSongClick = () => {
    dispatch( set_current(song) );
    if (sessionUser) {
      history.push({
        pathname: `/songs/${song.id}`,
        state: song
      });
    }
  }

  return (
    <div
      className={`song-card ${isPlaying ? 'sc-highlite' : ''}`}
      key={`song-card-${song}`}
      onClick={handleSongClick}
    >
      <img onError={()=>setTrackURL(defaultIMG)} src={trackURL} alt='track image'></img>
      <div className='song-card-info'>
        <h3>{song.name}</h3>
        <p>{song.user.username}</p>
        <span>
          <p>#{song.genre}</p>
        </span>
      </div>
      <div className='song-actions'>
        {userOpts && (
          <span className='user-options'>
            <i className='fa-solid fa-delete-left'></i>
            <i className='fas fa-pen-to-square'></i>
          </span>
        )}
        {isLiked}
      </div>
    </div>
  );
}

export default SongCard;