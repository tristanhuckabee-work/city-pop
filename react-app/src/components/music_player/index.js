import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './music_player.css';


function MusicPlayer({ song }) {
  const currentSong = useSelector(state => state?.songs?.currentSong);
  // const currentList = useSelector(state => state?.playlists?.current);
  const [currTrack, setCurrTrack] = useState('')


  useEffect(() => {
    setCurrTrack(song?.track_url)
  }, [currentSong])

  return (
    <section id='music-player'>
      <div id='mp-song-info'>
        <img className='mp-image' src={song?.image_url}></img>
        <div className='mpsi-inner'>
          <p>{song?.name}</p>
          <p>{song?.user?.username}</p>
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