import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../00_compUtils/genUtils';
import OpenModalButton from "../00_open_modal_button";
import './commentList.css'
import CommentDeleteModal from './commentDelete';
import CommentEditModal from './commentEdit';

function CommentCard({ comment }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const userOpts = comment?.user?.id == sessionUser?.id;
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  useEffect(()=> {},[comment])

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
          <h3 className='user-page-link'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              history.push(`/users/${comment?.user?.id}`)
            }}
          >{comment?.user?.username}</h3>
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