import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { create_new_comment } from '../../store/comments';
import OpenModalButton from "../00_open_modal_button";
import './songdetails.css'

function CommentForm({song_id, func}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [content, setContent] = useState('');

  const submitComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('song_id', song_id);
    formData.append('user_id', sessionUser.id);
    
    const res = await dispatch(create_new_comment(formData, song_id))
    setContent('')
  }

  
  return (
    <form onSubmit={(e) => submitComment(e)}>
      <input
        id='comment-create'
        type='text'
        onChange={(e) => setContent(e.target.value)}
        placeholder='Drop a Comment!'
        value={content}
      >

      </input>
      <button type='submit'>Comment</button>
    </form>
  )
}

export default CommentForm;