import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { get_all_songs } from '../../store/songs';
import './songcard.css'

function SongCard({ song }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const likes = useSelector(state => state.likes);
  const defaultIMG = "https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png";
  // const image = song.image_url != "" ? song.image_url : defaultImage;
  const [trackURL, setTrackURL] = useState(song.image_url);


  const userOpts = song.user.id == sessionUser.id;
  const likeSong = () => {
    console.log('like/unlike song');
  }
  const isLiked = likes?.[song.id] ? <i className='fas fa-heart' onClick={likeSong}></i> : <i className='far fa-heart' onClick={likeSong}></i>

  return (
    <div
      className='song-card'
      key={`song-card-${song}`}
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