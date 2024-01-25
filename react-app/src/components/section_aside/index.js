import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MiniSongCard from './card_song_mini';
import UserCard from '../card_user';
import './aside.css';
import { get_all_songs } from '../../store/songs';
import { get_following, get_recommended } from '../../store/follows';

function SideBar({ user, follow, rFollows, rSongs }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const following = useSelector(state => state?.follows?.following);
  const recommended = useSelector(state => state?.follows?.recommended);
  const songs = useSelector(state => state?.songs?.songs)
  const currentSong = useSelector(state => state?.songs?.currentSong);

  useEffect(() => {
    dispatch(get_all_songs());
    dispatch(get_recommended());
    dispatch(get_following());
  }, [dispatch]);

  const followingList = () => {
    let comp = [];
    for (let follow in following) {
      const curr = following[follow];
      comp.push(<UserCard key={`user-card-${curr?.id}`} user={curr?.user} status={curr?.isFollowed} />);
    }
    return comp;
  }
  const recUsers = () => {
    let comp = [];
    for (let follow in recommended) {
      const curr = recommended[follow];
      comp.push(<UserCard key={`user-card-${curr?.id}`} user={curr} />);
    }
    return comp;
  }
  const recSongs = () => {
    let comp = [];
    for (let song in songs) {
      const curr = songs[song]
      if (curr.user.id == user.id
      && curr.id != currentSong.id) {
        comp.push(
          <MiniSongCard
            key={`song-card-${curr.id}`}
            song={curr}
          />
        )
      }
    }
    if (comp.length < 5) {
      for (let song in songs) {
        const curr = songs[song]
        if (curr.user.id != user.id
        && curr.id != currentSong.id
        && curr.genre == currentSong.genre) {
          comp.push(
            <MiniSongCard
              key={`song-card-${curr.id}`}
              song={curr}
            />
          )
        }
      }
    }
    
    return comp.slice(0,10);
  }

  return (
    <aside>
      {rSongs && user && (
        <>
          <h2 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              history.push(`/users/${user.id}`)
            }}
          >Like <span className='user-page-link'>{user?.username}</span></h2>
          {recSongs()}
        </>
      )}
      {follow && (
        <>
          <h2>Following</h2>
          {followingList()}
        </>
      )}
      {rFollows && (
        <>
          <h2>Recommended</h2>
          {recUsers()}
        </>
      )}
    </aside>
  )
}

export default SideBar;