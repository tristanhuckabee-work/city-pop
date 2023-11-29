import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { delete_song, update_song, get_one_song } from '../../store/songs';
import SideBar from '../section_aside';
import CommentList from '../section_comment';
import CommentForm from '../form_comment';
import './songdetails.css'
import LoadingDiv from '../00_loading';

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
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(currentSong?.name);
  const [isLoading, setIsLoading] = useState(false)

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
        setName(res.name);
      });
  }, [dispatch, current]);

  const makeEditForm = () => {
    if (isLoading) {
      return <LoadingDiv />
    }
    return (
      <form onSubmit={e => handleEdit(e)} className='sd-song-edit'>
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
        <input
          placeholder='Song Title'
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button onClick={e => handleEdit(e)}>Yes</button>
        <button onClick={(e) => {
          e.stopPropagation();
          setShowEdit(false)
        }}
        >Cancel</button>
      </form>
    )
  }
  const likeSong = () => {
    console.log('like/unlike song');
  }
  const isLiked = likes?.[currentSong.id] ? <i className='fas fa-heart fa-2x' onClick={likeSong}></i> : <i className='far fa-heart fa-2x' onClick={likeSong}></i>
  const handleDelete = async e => {
    e.stopPropagation();

    await dispatch(delete_song(id));
    history.push('/');
  }
  const handleEdit = async e => {
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
      id, name,
      image_url: imageURL ? imageURL : currentSong.image_url,
    }

    const res = await dispatch(update_song(newSong));

    setIsLoading(false);
    setShowEdit(false);
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
          {showEdit && makeEditForm()}
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