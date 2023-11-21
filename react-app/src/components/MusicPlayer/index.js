import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import OpenModalButton from "../OpenModalButton";
import './musicplayer.css';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Player({ song }) {
  const currentSong = useSelector(state => state?.songs?.currentSong);
  const currentUser = useSelector(state => state?.session?.user);
  const [currTrack, setCurrTrack] = useState('')
  // const [playing, setIsPlaying] = useState(false)


  useEffect(() => {
    setCurrTrack(song?.track_url)
  }, [currentSong])

  return (
    <section id='music-player'>
      <div id='mp-song-info'>
        <img className='mp-image' src={song?.image_url}></img>
        <div className='mpsi-inner'>
          <p>{song?.name}</p>
          <p>{song?.user.username}</p>
        </div>
      </div>
      <AudioPlayer
        autoPlay
        showFilledVolume={true}
        layout='horizontal'
        src={song?.track_url}
      />
    </section>
  )
}

export default Player;