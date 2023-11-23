import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_comment } from '../../store/comments';
import './commentList.css'

function CommentDeleteModal({ func, comment }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [error, setError] = useState(null);

  const deleteComment = async () => {
    const res = await dispatch(delete_comment(comment.id))
    if (res) console.log(res.message)
  }

  return (
    <>
      <div className='delConfirm'>
        <p>Delete Comment?</p>
        <button onClick={deleteComment}>CONFIRM</button>
        <button onClick={() => func(false)}>CANCEL</button>
      </div>
    </>
  )
}

export default CommentDeleteModal;