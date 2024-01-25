import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getOtherUser, updateUser } from '../../store/session';
import { get_user_songs } from '../../store/songs';
import OpenModalButton from "../00_open_modal_button";
import PlaylistList from '../section_playlists';
import PlaylistForm from '../form_playlist';
import SongList     from '../section_songs';
import LoadingDiv from '../00_loading';
import './userpage.css'

function UserPage() {
  const id = +window.location.href.split('/')[4];
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const isFollowed = useSelector(state => state.follows.following[id]);
  const thisUser = useSelector(state => state.session.other);
  // console.log(isFollowed);

  const isCurrentUser = sessionUser?.id == thisUser?.user.id;
  const [editImageURL, setEditImageURL] = useState(thisUser?.user?.image_url);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState(thisUser?.user?.description || '');
  const [showEdit, setShowEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getOtherUser(id));
  }, [dispatch]);

  const followUnfollow = () => {
    if (!isCurrentUser) {
      if (isFollowed) {
        return (
          <i className='fas fa-user-plus fa-2x follow-info follow-action'></i>
        )
      }
      return (
        <i className='fas fa-user-minus fa-2x follow-info follow-action'></i>
      )
    }
    return (
      <i className="fa-solid fa-pen-to-square fa-2x follow-info follow-action"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setShowEdit(!showEdit)
        }}
      ></i>
    )
  }
  const rButtonText = () => {
    if (!isCurrentUser) {
      if (isFollowed) return 'Unfollow'
      return 'Follow'
    }
    return 'Edit'
  }
  const handleEditUser = async e => {
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

      setEditImageURL(image);
    }
    setIsLoading(false);

    await dispatch(updateUser(sessionUser.id, editImageURL, description));

    setShowEdit(false);
  }

  return (
    <main id='user-details'>
      <section className='user-details'>
        <img src={thisUser?.user.image_url} alt='user profile picture'></img>
        <span className='user-info'>
          <h1>{thisUser?.user.username}</h1>
          <p>{thisUser?.user.email}</p>
          <span className='user-follow-details'>
            <h2 className='follow-info'>{thisUser?.ers_cnt}</h2>
            <h2 className='follow-info'>{thisUser?.ing_cnt}</h2>
            {followUnfollow()}
            <p>Followers</p>
            <p>Following</p>
            <p>{rButtonText()}</p>
          </span>
        </span>
        <p><strong>Description: </strong>{thisUser?.user.description || 'No Description Available :('}</p>
      </section>
      {showEdit && isLoading && (
        <LoadingDiv />
      )}
      {showEdit && !isLoading && (
        <section className='ud-edit-user'>
          <h2>Edit Image & Description</h2>
          <form onSubmit={(e) => handleEditUser(e)}>
            <p>Enter a URL or upload an Image File</p>
            <input
              type='text'
              className='url'
              value={editImageURL}
              onChange={e => {
                setIsDisabled(false)
                setEditImageURL(e.target.value)
              }}
              placeholder='Enter a URL'
            ></input>
            <input
              type='file'
              className='up-load'
              onChange={e => {
                setIsDisabled(false);
                setImageFile(e.target.files[0])
              }}
            ></input>
            <p>Description</p>
            <textarea
              className='url'
              rows='5'
              cols='150'
              value={description}
              onChange={e => {
                setIsDisabled(false);
                setDescription(e.target.value)
              }}
              placeholder='Enter a Description'
            ></textarea>

            <span className='editForm-buttons'>
              <button 
                className='sub-edit'
                disabled={isDisabled}
                type='submit'
              >UPDATE PROFILE</button>
              <button onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowEdit(false)
              }}>CANCEL</button>
            </span>
          </form>
        </section>
      )}
      <section className='ud-playlists'>
        <h2>Playlists - Work in Progress
          {isCurrentUser && (
            <OpenModalButton
              buttonText="+ New Playlist"
              modalComponent={<PlaylistForm />}
            />
          )}
        </h2>
        {thisUser?.playlists.length ? (
          <PlaylistList playlists={thisUser?.playlists} />
        ) : (
          <p className='empty-section'>Nothing to see here...</p>
        )}
      </section>
      <section className='ud-songs'>
        <h2>Uploaded Songs</h2>
        {thisUser?.songs.length ? (
          <SongList songs={thisUser?.songs} />
        ) : (
          <p className='empty-section'>Nothing to see here...</p>
        )}
      </section>
    </main>
  )
}

export default UserPage;