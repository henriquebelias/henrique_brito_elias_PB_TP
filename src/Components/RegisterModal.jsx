import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser, auth } from '../firebase';
import { Input } from './Input';
import { useUserContext } from '../context/';
import './RegisterModal.css';

export function RegisterModal({ handleOpen }) {
  const { setUsername, fetchUsers } = useUserContext();
  const [userObj, setUserObj] = useState({ username: '', email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserObj((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const handleClick = async () => {
    const { username, email, password } = userObj;

    if (email && password) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      setUsername(username);

      await addUser(userCredential.user.uid, username, userCredential.user.email);

      handleOpen('register', false);
    }

    fetchUsers();
  };

  return (
    <div className="register-modal-bg">
      <div className="register-modal-container">
        <div className="register-modal-header">
          <h3 className="register-modal-title">Registrar Usuário</h3>
          <p className="register-modal-close" onClick={() => handleOpen('register', false)}>
            X
          </p>
        </div>
        <div className="register-modal-input-container">
          <Input id="username" type="text" handleChange={handleChange} value={userObj.username}>
            Nome usuário:
          </Input>
          <Input id="email" type="email" handleChange={handleChange} value={userObj.email}>
            Email:
          </Input>
          <Input id="password" type="password" handleChange={handleChange} value={userObj.password}>
            Senha:
          </Input>
          <button type="button" className="register-modal-button" onClick={handleClick}>
            REGISTRAR
          </button>
        </div>
      </div>
    </div>
  );
}
