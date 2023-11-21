import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import OpenModalButton from "../OpenModalButton";
import UserCard from '../UserCard';
import './Homepage.css';

function FollowingAside() {
  const following = useSelector(state => state.follows.following);
  const recommended = useSelector(state => state?.follows?.recommended);

  const followingList = () => {
    let comp = [];
    for (let follow in following) {
      console.log('IN COMP', following)
      const curr = following[follow];
      comp.push(<UserCard key={`user-card-${curr?.id}`} user={curr?.user} status={curr?.isFollowed} />);
    }
    return comp;
  }
  const recommendList = () => {
    let comp = [];
    for (let follow in recommended) {
      console.log('IN COMP', recommended)
      const curr = recommended[follow];
      comp.push(<UserCard key={`user-card-${curr?.id}`} user={curr} />);
    }
    return comp;
  }

  return (
    <aside id='following'>
      <h2>Following</h2>
      {followingList()}
      {recommended && (
        <>
          <h2>Recommended</h2>
          {recommendList()}
        </>
      )}
    </aside>
  )
}

export default FollowingAside;