import React from 'react';
import { useState } from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import { Button } from './Button';
import { useUserContext } from '../context/';
import { AddTopicModal } from './AddTopicModal';
import './UserControl.css';

export function UserControl({ setAddedPost }) {
  const { username, logout, isAuth } = useUserContext();
  const [openModal, setOpenModal] = useState({ register: false, login: false, addTopic: false });

  const handleOpenModal = (modal, value) => {
    const prevState = { ...openModal };
    prevState[modal] = value;
    setOpenModal(prevState);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="button-container">
        {!isAuth ? (
          <Button handleClick={handleOpenModal} modal="register">
            REGISTRAR
          </Button>
        ) : (
          <Button handleClick={handleOpenModal} modal="addTopic">
            CRIAR TÓPICO
          </Button>
        )}
        {isAuth ? (
          <p className="logout-container" onClick={handleLogout}>
            {username}
            <MdOutlineLogout className="red-text" />
          </p>
        ) : (
          <Button handleClick={handleOpenModal} modal="login">
            LOGIN
          </Button>
        )}
      </div>
      {openModal.register && <RegisterModal handleOpen={handleOpenModal} />}
      {openModal.login && <LoginModal handleOpen={handleOpenModal} />}
      {openModal.addTopic && (
        <AddTopicModal handleOpen={handleOpenModal} setAddedPost={setAddedPost} />
      )}
    </>
  );
}
