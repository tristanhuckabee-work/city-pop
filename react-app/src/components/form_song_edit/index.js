import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update_song } from '../../store/songs';
import { useModal } from '../../context/Modal';
import LoadingDiv from '../00_loading';
import './editSongForm.css'

function EditSongForm({func, currentSong}) {
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(currentSong?.name);
  const [genre, setGenre] = useState(currentSong?.genre);
  const [isLoading, setIsLoading] = useState(false)
  const { closeModal } = useModal();

  const handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    if (imageFile) {
      const cloudinaryURL = 'https://api.cloudinary.com/v1_1/dzsgront4/auto/upload';
      const cloudinaryImage = new FormData();
      cloudinaryImage.append('file', imageFile);
      cloudinaryImage.append('upload_preset', 'city_pop_songs');
      const imageRes = await fetch(cloudinaryURL, { method: 'POST', body: cloudinaryImage })
      let image = await imageRes.json();
      image = image.secure_url;

      setImageURL(image);
    }
    const newSong = {
      id: currentSong.id,
      name,
      genre: !genre ? 'noGenre' : genre,
      image_url: imageURL ? imageURL : currentSong.image_url,
    }

    const res = await dispatch(update_song(newSong));

    setIsLoading(false);
    if (func) func(false);
    else closeModal()
  }
  if (isLoading) {
    return <LoadingDiv />
  } else {
    return (
      <form onSubmit={e => handleSubmit(e)} className='sd-song-edit'>
        <h3>Edit Your Song</h3>
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
          onChange={e => setImageFile(e.target.files[0])}
        ></input>
        <p>Title</p>
        <input
          placeholder='Song Title'
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p>Genre</p>
        <input
          placeholder='Genre'
          required
          type='text'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        ></input>
        <button type='submit'>Yes</button>
        <button onClick={(e) => {
          e.stopPropagation();
          if (func) func(false);
          else closeModal();
        }}
        >Cancel</button>
      </form>
    )
  }
}

export default EditSongForm;