import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Player from "./components/MusicPlayer";
import SongDetailPage from "./components/SongDetailsPage";

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
      <Player song={currentSong}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/songs/:id">
            <SongDetailPage />
          </Route>
          
        </Switch>
      )}
    </>
  );
}

export default App;
