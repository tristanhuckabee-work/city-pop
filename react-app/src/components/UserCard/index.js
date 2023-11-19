import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { get_following } from '../../store/follows';
import './usercard.css'

function UserCard({ user, status }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userOpts = status ? <i className='fas fa-user-minus'></i> : <i className='fas fa-user-plus'></i>;
  const defaultImageURL = "https://res.cloudinary.com/dzsgront4/image/upload/v1700369776/default-pp_v5z5rj.png";
  const image = user.image_url || defaultImageURL

  return (
    <div className='userCard' key={`user-card-${user.id}-${sessionUser.id}`}>
      <span>
        <img src={image} alt='profile picture' />
        <h3>{user.username}</h3>
      </span>
      {userOpts}
    </div>
  );
}

export default UserCard;