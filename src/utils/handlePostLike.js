import { getUser, updateUser } from '../firebase';

export const getUserLikedPost = (postId, userData) => {
  const likedPosts = { ...userData.likedPosts };

  if (likedPosts) {
    if (likedPosts[postId]) return likedPosts[postId];
  }

  return null;
};

export const saveLikedPost = async (userId, postId, data, userData, setUserData) => {
  const userDataCopy = { ...userData };
  const likedPosts = { ...userData.likedPosts };

  if (likedPosts) {
    likedPosts[postId] = data;

    userDataCopy.likedPosts = likedPosts;

    await updateUser(userId, { likedPosts });
  } else {
    userDataCopy.likedPosts = { [postId]: data };

    await updateUser(userId, { likedPosts: { [postId]: data } });
  }

  const updatedUser = await getUser(userId);
  setUserData(updatedUser);

  return true;
};
