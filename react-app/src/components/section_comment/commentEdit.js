import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../00_compUtils/genUtils';
import OpenModalButton from "../00_open_modal_button";
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