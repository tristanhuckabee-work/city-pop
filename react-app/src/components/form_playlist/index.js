import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './playlistForm.css'

function PlaylistForm({ song }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultIMG = "https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png";
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Not Yet Implemented');
  }

  return (
    <div className='song-modal'>
      <form className='playlist-form' onSubmit={e => handleSubmit(e)}>
        <h2>Upload A Playlist</h2>
        <p>Title</p>
        <input
          type='text'
          value =''
        ></input>
        <p>Enter a URL or upload an Image File</p>
        <input
          type='text'
          className='url'
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
          placeholder='Enter a URL'
        ></input>
        <input
          type='file'
          className='up-load'
        ></input>
        <p>Description</p>
        <input
          type='text'
          value =''
        ></input>
        <button type='submit'>Create Playlist</button>
      </form>
    </div>
  );
}

export default PlaylistForm;