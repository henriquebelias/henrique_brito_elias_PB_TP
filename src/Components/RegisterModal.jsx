import { useState } from 'react';
import { Input } from './Input';

export function RegisterModal({ handleOpen }) {
  const [userObj, setUserObj] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserObj((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  return (
    <div className="h-screen w-screen bg-black bg-opacity-80 absolute top-0">
      <div className="border border-black bg-white p-8 relative top-32 w-3/5 left-[22%] sm:w-2/3 sm:left-[20%] 2xl:w-2/4 2xl:left-[30%]">
        <div className="flex place-content-between">
          <h3 className="text-2xl my-4 max-[459px]:text-base">Registrar Usuário</h3>
          <p
            className="text-2xl my-4 cursor-pointer max-[459px]:text-base"
            onClick={() => handleOpen('register', false)}>
            X
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <Input id="firstName" type="text" handleChange={handleChange} value={userObj.firstName}>
            Nome:
          </Input>
          <Input id="lastName" type="text" handleChange={handleChange} value={userObj.lastName}>
            Sobrenome:
          </Input>
          <Input id="email" type="email" handleChange={handleChange} value={userObj.email}>
            Email:
          </Input>
          <Input id="password" type="password" handleChange={handleChange} value={userObj.password}>
            Senha:
          </Input>
          <button
            className="border border-black w-fit self-center p-3"
            onClick={() => handleOpen('register', false)}>
            REGISTRAR
          </button>
        </div>
      </div>
    </div>
  );
}
