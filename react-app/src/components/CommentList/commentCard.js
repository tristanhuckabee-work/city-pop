import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../compUtils/genUtils';
import OpenModalButton from "../OpenModalButton";
import './commentList.css'
import CommentDeleteModal from './commentDelete';
import CommentEditModal from './commentEdit';

function CommentCard({ comment }) {
  const sessionUser = useSelector(state => state.session.user);
  const userOpts = comment?.user?.id == sessionUser?.id;
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  useEffect(()=> {
    console.log(comment.id, comment)
  },[comment])
  const createContent = () => {
    if (editForm) {
      return (
        <CommentEditModal func={setEditForm} comment={comment} />
      )
    }
    if (deleteForm) {
      return (
        <>
          <CommentDeleteModal func={setDeleteForm} comment={comment} />
          <span className='cc-content'>
            {comment?.content}
          </span>
          <p className='cc-date'>{formatDate(comment?.updated_at)}</p>
        </>
      )
    }
    return (
      <>
        <span className='cc-content'>
          {comment?.content}
        </span>
        <p className='cc-date'>{formatDate(comment?.updated_at)}</p>
      </>
    )
  }

  return (
    <div className='comment-card'>
      <span className='cc-user'>
        <span className='ccul'>
          <img src={comment?.user?.image_url}></img>
          <h3>{comment?.user?.username}</h3>
        </span>
        <span className='ccur'>
          {userOpts && (
            <>
              <i className='fa-solid fa-delete-left'
                onClick={() => {
                  setEditForm(false);
                  setDeleteForm(!deleteForm);
                }}
              ></i>
              <i className='fas fa-pen-to-square'
                onClick={() => {
                  setDeleteForm(false);
                  setEditForm(!editForm);
                }}
              ></i>
            </>
          )}
        </span>
      </span>
      {createContent()}
    </div>
  )
}

export default CommentCard;