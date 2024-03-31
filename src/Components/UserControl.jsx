import { useState } from 'react';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import { Button } from './Button';

export function UserControl() {
  const [openModal, setOpenModal] = useState({ register: false, login: false });

  const handleOpenModal = (modal, value) => {
    const prevState = { ...openModal };
    prevState[modal] = value;
    setOpenModal(prevState);
  };

  return (
    <>
      <div className="flex gap-2 justify-end mr-3 my-3">
        <Button handleClick={handleOpenModal} modal="register">
          REGISTRAR
        </Button>
        <Button handleClick={handleOpenModal} modal="login">
          LOGIN
        </Button>
      </div>
      {openModal.register && <RegisterModal handleOpen={handleOpenModal} />}
      {openModal.login && <LoginModal handleOpen={handleOpenModal} />}
    </>
  );
}
