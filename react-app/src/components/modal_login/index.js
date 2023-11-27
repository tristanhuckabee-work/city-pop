import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (email.length && password.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      let error = 'invalid credentials';
      setErrors(error);
    } else {
      closeModal()
    }
  };
  const demoLogin = async(e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@user.io', 'password'));
    if (data) {
      let error = 'invalid credentials';
      setErrors(error);
    } else {
      closeModal()
    }
  }

  return (
    <div id='login-form'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div className='input-info'>
            Email
            <span className='errors'>{errors}</span>
          </div>
          <input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <div className='input-info'>Password</div>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={isDisabled}
        >
          {(isDisabled && ('Please Enter Credentials')) || 'Log In'}
        </button>
      </form>
      <button className='demo-login' onClick={demoLogin}>Log In as Demo User</button>
    </div>
  );
}

export default LoginFormModal;
