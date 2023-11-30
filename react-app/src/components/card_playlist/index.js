import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { delete_song, set_current } from '../../store/songs';
import OpenModalButton from "../00_open_modal_button";
import EditSongForm from "../form_song_edit";
import './playlistcard.css'

function PlaylistCard({ playlist }) {
  const history = useHistory();
  const [image, setImage] = useState(playlist.image_url);
  useEffect(() => {
    if (!playlist.image_url.length) {
      setImage('https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png')
    }
  }, [playlist])

  return (
    <div className='playlist'
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/playlists/${playlist.id}`);
      }}
    >
      <img src={image} alt='playlist cover'></img>
      <span className='playlist-inner'>
        <h3>{playlist.name}</h3>
        <h3>{playlist.song_cnt}</h3>
      </span>
    </div>
  );
}

export default PlaylistCard;