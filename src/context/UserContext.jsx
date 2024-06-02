import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, getUser, getUsers } from '../firebase';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential) {
        const user = await getUser(userCredential.user.uid);

        setUsername(user.username);
        setUserId(userCredential.user.uid);
        setUserData(user);
      }
    } catch (error) {
      alert('Não foi possível realizar o login');
    }
  };

  const logout = () => {
    auth.signOut();
  };

  const fetchUsers = async () => {
    const users = await getUsers();

    if (users) {
      const usersArr = Object.values(users);

      const userSorted = usersArr.toSorted(({ points: firstValue }, { points: secondValue }) => {
        if (firstValue > secondValue) return -1;
        if (firstValue < secondValue) return 1;
        return 0;
      });

      setUsers(userSorted);

      const currentUser = usersArr.find((user) => user.username === username);

      setUsername(currentUser.username);
      setUserData(currentUser);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRes = await getUser(user.uid);

        setUserId(user.uid);

        if (userRes) {
          setUsername(userRes.username);
          setUserData(userRes);
        }

        setIsAuth(!!user);
      } else {
        setIsAuth(false);
      }
    });

    fetchUsers();

    return () => unsub();
  }, []);

  const context = {
    username,
    login,
    logout,
    isAuth,
    setUsername,
    users,
    fetchUsers,
    userId,
    userData,
    setUserData
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
