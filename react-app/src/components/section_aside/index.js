import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserCard from '../card_user';
import './aside.css';

function SideBar({ user, follow, rFollows, rSongs }) {
  const history = useHistory();
  const following = useSelector(state => state?.follows?.following);
  const recommended = useSelector(state => state?.follows?.recommended);

  const followingList = () => {
    let comp = [];
    for (let follow in following) {
      const curr = following[follow];
      comp.push(<UserCard key={`user-card-${curr?.id}`} user={curr?.user} status={curr?.isFollowed} />);
    }
    return comp;
  }
  const recUsers = () => {
    let comp = [];
    for (let follow in recommended) {
      const curr = recommended[follow];
      comp.push(<UserCard key={`user-card-${curr?.id}`} user={curr} />);
    }
    return comp;
  }
  const recSongs = () => {
    let comp = [];
    return comp;
  }

  return (
    <aside>
      {rSongs && user && (
        <>
          <h2 
            className='aside-link'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              history.push(`/users/${user.id}`)
            }}
          >By {user?.username}</h2>
          {recSongs()}
        </>
      )}
      {follow && (
        <>
          <h2>Following</h2>
          {followingList()}
        </>
      )}
      {rFollows && (
        <>
          <h2>Recommended</h2>
          {recUsers()}
        </>
      )}
    </aside>
  )
}

export default SideBar;