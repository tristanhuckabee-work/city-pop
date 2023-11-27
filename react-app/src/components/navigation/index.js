import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import OpenModalButton from "../00_open_modal_button";
import LoginFormModal  from "../modal_login";
import SignupFormModal from "../modal_signup";
import SongForm        from '../form_song';
import SearchBar       from './search_bar';
import ProfileButton   from './profile_button';

import { baseLogo, hoverLogo } from './nav-utils';
import './navigation.css';

function NavigationBar({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [logoHover, setLogoHover] = useState(false);
  const [logoURL, setLogoURL] = useState(baseLogo)

  useEffect(() => {
    if (logoHover) {
      setLogoURL(hoverLogo)
    } else {
      setLogoURL(baseLogo)
    }
  }, [logoHover]);

  return (
    <nav id='header-nav'>
      <NavLink exact to="/">
        <img
          onMouseOver={() => setLogoHover(!logoHover)}
          onMouseLeave={() => setLogoHover(!logoHover)}
          src={logoURL} alt='city pop logo'></img>
      </NavLink>
      {(sessionUser && (
          <>
            <SearchBar />
            <span id='nav-right'>
              <OpenModalButton
                buttonText="UPLOAD"
              modalComponent={<SongForm />}
              />
              <ProfileButton user={sessionUser} />
            </span>
          </>
        )) || (
          <div className='nav-right'>
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
    </nav>
  );
}

export default NavigationBar;