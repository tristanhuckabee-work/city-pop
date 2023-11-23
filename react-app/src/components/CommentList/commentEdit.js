import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../compUtils/genUtils';
import OpenModalButton from "../OpenModalButton";
import './commentList.css'

function CommentEditModal({ func, comment }) {
  const sessionUser = useSelector(state => state.session.user);

  const editComment = () => {
    console.log('deleteed uwu');
  }

  return (
    <form className='editComment'>

    </form>
  )
}

export default CommentEditModal;