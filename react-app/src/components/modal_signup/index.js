import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    if (email.length && username.length && confirmPassword.length && password.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        let errors = {}
        data.forEach(error => {
          if (error.startsWith('email')) {
            errors.email = error.slice(8);
          } else {
            errors.username = error.slice(11);
          }
        })
        setErrors(errors);
      } else {
        closeModal();
      }
    } else {
      setErrors({password: 'passwords must match'})
    }
  };

  return (
    <div id='signup-form'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div className='input-info'>
            Email
            <span className='errors'>{errors.email}</span>
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
        <div className='input-info'>
            Username
            <span className='errors'>{errors.username}</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <div className='input-info'>
            Confirm Password
            <span className='errors'>{errors.password}</span>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={isDisabled}
        >
          {(isDisabled && ('Please Enter Information')) || 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;