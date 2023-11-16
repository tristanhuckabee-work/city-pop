import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => { if (!showMenu) setShowMenu(true) };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu}>
        <i className="fas fa-user-circle fa-2x" />
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div id='nav-user'>
            <p>@{user.username}</p>
          </div>
              <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
