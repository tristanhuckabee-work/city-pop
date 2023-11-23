import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_for_current } from '../../store/comments';
import CommentCard from './commentCard';
import OpenModalButton from "../OpenModalButton";
import './commentList.css'

function CommentList({song_id}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments);
  
  useEffect(() => {
    dispatch(get_for_current(song_id))
  }, [dispatch])
  
  const showComments = () => {
    const comp = [];
    for (let c in comments) {
      const curr = comments[c];
      comp.push(
        <CommentCard comment={curr} />
      )
    }
    return comp;
  }

  return (
    <div className='comment-board'>
      {showComments()}
    </div>
  )
}

export default CommentList;