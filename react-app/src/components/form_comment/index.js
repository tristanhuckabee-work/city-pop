import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create_new_comment } from '../../store/comments';
import './commentForm.css'

function CommentForm({ song_id }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('song_id', song_id);
    formData.append('user_id', sessionUser.id);

    const res = await dispatch(create_new_comment(formData, song_id))
    if (Array.isArray(res.content)) {
      setError(res.content);
    } else {
      setContent('')
      setError(null);
    }
  }


  return (
    <>
      <form id='comment-form' onSubmit={(e) => handleSubmit(e)}>
        <input
          id='comment-create'
          type='text'
          onChange={(e) => setContent(e.target.value)}
          placeholder='Drop a Comment!'
          value={content}
        ></input>
        <button type='submit'>Comment</button>
      </form>
      <p className='comment-error error'>{error}</p>
    </>
  )
}

export default CommentForm;