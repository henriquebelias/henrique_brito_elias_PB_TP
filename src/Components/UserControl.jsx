import { useState } from 'react';
import { MdOutlineLogout } from 'react-icons/md';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import { Button } from './Button';
import { useUserContext } from '../context/';
import { AddTopicModal } from './AddTopicModal';

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
      <div className="flex gap-2 justify-end mr-3 my-3">
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
          <p
            className="flex items-center gap-2 border border-black py-2 px-4 cursor-pointer"
            onClick={handleLogout}>
            {username}
            <MdOutlineLogout className="text-red-500 font-bold" />
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
