import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import OpenModalButton from "../00_open_modal_button";
// import { get_following } from '../../store/follows';
import './usercard.css'

function UserCard({ user, status }) {
  const history = useHistory()
  // const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const defaultImageURL = "https://res.cloudinary.com/dzsgront4/image/upload/v1700369776/default-pp_v5z5rj.png";
  const image = user.image_url || defaultImageURL
  const userOpts = () => {
    if (status) {
      return (
        <i className='fas fa-user-minus'></i>
      )
    }
    return (
      <i className='fas fa-user-plus'></i>
    )
  }

  return (
    <div className='userCard'
      key={`user-card-${user.id}-${sessionUser.id}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/users/${user.id}`);
      }}
    >
      <span>
        <img src={image} alt='profile' />
        <h3>{user.username}</h3>
      </span>
      {userOpts()}
    </div>
  );
}

export default UserCard;