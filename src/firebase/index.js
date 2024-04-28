// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, push, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCveJIqWO3rNcopkBToHsum1ZjhUttq9IA',
  authDomain: 'pb-tp-2a2d8.firebaseapp.com',
  databaseURL: 'https://pb-tp-2a2d8-default-rtdb.firebaseio.com',
  projectId: 'pb-tp-2a2d8',
  storageBucket: 'pb-tp-2a2d8.appspot.com',
  messagingSenderId: '921496980795',
  appId: '1:921496980795:web:ab7f8f12dfc742ca7a3b1e'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export async function addUser(userId, username, email) {
  return await set(ref(db, 'users/' + userId), {
    username,
    email,
    points: 0
  });
}

export async function getUsers() {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'users/'));

  if (snapshot.exists()) {
    return await snapshot.val();
  }

  return null;
}

export async function getUser(id) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `users/${id}`));

  if (snapshot.exists()) {
    return await snapshot.val();
  }

  return null;
}

export async function addPost(body) {
  return await push(ref(db, 'posts/'), body);
}

export async function getPosts() {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, 'posts/'));

  if (snapshot.exists()) {
    return await snapshot.val();
  }

  return null;
}

export async function getPost(id) {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `posts/${id}`));

  if (snapshot.exists()) {
    return await snapshot.val();
  }

  return null;
}
