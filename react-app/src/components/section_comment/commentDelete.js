import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { delete_comment } from '../../store/comments';
import './commentList.css'

function CommentDeleteModal({ func, comment }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const deleteComment = async () => {
    const res = await dispatch(delete_comment(comment.id))
    if (res) setError(res.error);
    func(false)
  }

  return (
    <>
      <div className='delConfirm'>
        <p className='errors'>{error}</p>
        <p>Delete Comment?</p>
        <button onClick={deleteComment}>CONFIRM</button>
        <button onClick={() => func(false)}>CANCEL</button>
      </div>
    </>
  )
}

export default CommentDeleteModal;