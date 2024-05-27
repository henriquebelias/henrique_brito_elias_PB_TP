import React from 'react';
import { useState } from 'react';
import { Input } from './Input';
import { useUserContext } from '../context/';
import './LoginModal.css';

export function LoginModal({ handleOpen }) {
  const { login } = useUserContext();
  const [userObj, setUserObj] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserObj((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const handleClick = async () => {
    const { email, password } = userObj;

    if (email && password) {
      login(email, password);
    }

    handleOpen('login', false);
  };

  return (
    <div className="login-modal-bg">
      <div className="login-modal-container">
        <div className="login-modal-header">
          <h3 className="login-modal-title">Fazer login</h3>
          <p className="login-modal-close-icon" onClick={() => handleOpen('login', false)}>
            X
          </p>
        </div>
        <div className="login-modal-input-container">
          <Input id="email" type="email" handleChange={handleChange} value={userObj.email}>
            Email:
          </Input>
          <Input id="password" type="password" handleChange={handleChange} value={userObj.password}>
            Senha:
          </Input>
          <button className="login-modal-button" onClick={handleClick}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
