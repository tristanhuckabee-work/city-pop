import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { edit_comment }   from '../../store/comments';
import { formatDate }     from '../00_compUtils/genUtils';
import OpenModalButton    from "../00_open_modal_button";
import CommentDeleteModal from './commentDelete';
import './commentList.css'

function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const userOpts = comment?.user?.id == sessionUser?.id;
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [cContent, setCContent] = useState(comment?.content);
  const [errors, setErrors] = useState(null);

  useEffect(()=> {},[comment])

  const handleEdit = async e => {
    e.preventDefault();
    e.stopPropagation();
    
    if (cContent === '') {
      setErrors('This field is required');
      return;
    }
    
    let payload = { content: cContent };
    await dispatch(edit_comment(payload, comment.id));

    setEditForm(false);
  }

  const createContent = () => {
    if (editForm) {
      return (
        <>
          <p className='errors'>{errors}</p>
          <form className='ccc-edit'>
            <input
              type='text'
              value={cContent}
              onChange={e => {
                console.log(e.target.value)
                setCContent(e.target.value)
              }}
              placeholder='Comment Content Here'
            ></input>

            <button className='submit'
              onClick={e => handleEdit(e)}
            >Update</button>
            <button className='cancel'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                setEditForm(false);
              }}
            >Cancel</button>
          </form>
        </>
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