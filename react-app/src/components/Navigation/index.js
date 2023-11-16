import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import { baseLogo, hoverLogo } from './nav-utils';
import './Navigation.css';

function Navigation({ isLoaded }) {
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
          src={logoURL}
          alt='city pop logo'></img>
      </NavLink>
      {(
        sessionUser && (
            <ProfileButton user={sessionUser} />
        )
      ) || (
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

export default Navigation;