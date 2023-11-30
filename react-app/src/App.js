import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/navigation";
import MusicPlayer from "./components/music_player";
import Main from "./components/main";
import SongDetailPage from "./components/main_song_details";
import UserPage from "./components/main_user_details";
import MyFooter from "./components/section_footer";
import PlaylistPage from "./components/main_playlist_details";

function App() {
  const dispatch = useDispatch();
  const currentSong = useSelector(state => state?.songs?.currentSong);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <MusicPlayer song={currentSong} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/users/:id">
            <UserPage />
          </Route>
          <Route path="/songs/:id">
            <SongDetailPage />
          </Route>
          <Route path="/playlists/:id">
            <PlaylistPage />
          </Route>
        </Switch>
      )}
      <MyFooter />
    </>
  );
}

export default App;
