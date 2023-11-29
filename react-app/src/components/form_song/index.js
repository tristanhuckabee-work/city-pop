import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_song } from '../../store/songs';
import LoadingDiv from '../00_loading';
import { useModal } from '../../context/Modal';


import './songForm.css';

function SongForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user);
  
  const [audioURL, setAudioURL] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, [audioURL])

  const handlePreview = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);
    if (audioFile) {

      const cloudinaryURL = 'https://api.cloudinary.com/v1_1/dzsgront4/auto/upload';
      const cloudinarySong = new FormData();
      cloudinarySong.append('file', audioFile);
      cloudinarySong.append('upload_preset', 'city_pop_songs');
      const songRes = await fetch(cloudinaryURL, { method: 'POST', body: cloudinarySong })
      let song = await songRes.json();
      song = song.secure_url;

      setAudioURL(song);
    }
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
    setIsLoading(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // https://res.cloudinary.com/dzsgront4/image/upload/v1649206041/ab67616d0000b2731a8bba168d85553d9b2d47a9_ezchvc.jpg
    // https://res.cloudinary.com/dzsgront4/image/upload/v1700881719/city_pop_songs/sxleomnwqm6fud3rgr6m.jpg
    const formData = new FormData();
    formData.append('name', name);
    formData.append('genre', genre);
    formData.append('image_url', imageURL);
    formData.append('track_url', audioURL);
    formData.append('user_id', sessionUser.id);

    const res = await dispatch(add_song(formData));
    if (!res.errors) {
      history.push(`/songs/${res.id}`);
      closeModal();
    }
  }

  const songPreview = () => {
    let content = 'Please Provide the Details or Hit Submit'
    let withSongDetails = (
      <>
        <div className='sfm-preview'>
          <div className='sfmp-inner'>
            <h3>{name}</h3>
            <p>{genre}</p>
            <audio controls>
              <source src={audioURL} />
            </audio>
          </div>
          <img src={imageURL} alt='track cover' />
        </div>
        <button onClick={e => handleSubmit(e)}>PUBLISH!</button>
      </>
    )
    if (audioURL.length && name.length) {
      if (!imageURL.length) setImageURL('https://res.cloudinary.com/dzsgront4/image/upload/v1700367882/default-album_rbfna6.png')
      content = withSongDetails;
    }
    return (
      <>
        {content}
      </>
    )
  }


  return (
    <div className='song-modal'>
      <form className='song-form' onSubmit={handlePreview}>
        <h2>Upload A Song</h2>
        <ul>
          <li className='form-specs'>* Elements are Required</li>
          <li className='form-specs'>If you Provide a URL and a File, we will use the File</li>
        </ul>
        <p>Enter a URL or upload a Music File*</p>
        <input
          type='text'
          className='url'
          value={audioURL}
          onChange={e => setAudioURL(e.target.value)}
          placeholder='Enter a URL'
        ></input>
        <input
          type='file'
          className='up-load'
          onChange={e => setAudioFile(e.target.files[0])}
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
          onChange={e => setImageFile(e.target.files[0])}
        ></input>
        <p>Song Title*</p>
        <input
          placeholder='Song Title'
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <p>Song Genre</p>
        <input
          placeholder='Song Genre'
          type='text'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        ></input>
        <button type='submit'>PREPARE</button>
      </form>
      <section className='song-modal-deets'>
        {songPreview()}
        {isLoading && <LoadingDiv />}
      </section>
    </div>
  );
}

export default SongForm;