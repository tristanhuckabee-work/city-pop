import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './music_player.css';


function MusicPlayer({ song }) {
  const history = useHistory()
  const currentSong = useSelector(state => state?.songs?.currentSong);
  // const currentList = useSelector(state => state?.playlists?.current);
  const [currTrack, setCurrTrack] = useState('')


  useEffect(() => {
    setCurrTrack(song?.track_url)
  }, [currentSong])

  return (
    <section id='music-player'>
      <div id='mp-song-info'
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          history.push(`/songs/${song?.id}`);
        }}
      >
        <img className='mp-image' src={song?.image_url}></img>
        <div className='mpsi-inner'>
          <p>{song?.name}</p>
          <p className='user-page-link'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              history.push(`/users/${song?.user?.id}`);
            }}
          >{song?.user?.username}</p>
        </div>
      </div>
      <AudioPlayer 
        autoPlay
        showFilledVolume={true}
        layout='horizontal'
        src={song?.track_url}
      />
      <button id='play-next-song'>NEXT</button>
    </section>
  )
}

export default MusicPlayer;