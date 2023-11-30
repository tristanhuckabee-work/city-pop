import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { set_current } from '../../store/songs';
import './aside.css'

function MiniSongCard({ song }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultIMG = "https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png";

  const sessionUser = useSelector(state => state.session.user);
  const songPlaying = useSelector(state => state.songs.currentSong);

  const [trackURL, setTrackURL] = useState(song?.image_url);

  const isPlaying = song?.id === songPlaying?.id;

  const handleSongClick = () => {
    dispatch(set_current(song));
    if (sessionUser) {
      history.push({
        pathname: `/songs/${song.id}`,
        state: song
      });
    }
  }

  return (
    <div
      className={`mini-song-card ${isPlaying ? 'sc-highlite' : ''}`}
      key={`mini-song-card-${song}`}
      onClick={handleSongClick}
    >
      <img onError={() => setTrackURL(defaultIMG)} src={trackURL} alt='track cover'></img>
      <div className='mini-song-card-info'>
        <h3>{song.name}</h3>
      </div>
    </div>
  );
}

export default MiniSongCard;