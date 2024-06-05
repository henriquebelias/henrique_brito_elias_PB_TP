import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegThumbsUp, FaRegThumbsDown, FaRegCommentAlt } from 'react-icons/fa';
import { useUserContext } from '../context/';
import './PostCard.css';
import { getUserLikedPost, saveLikedPost } from '../utils/handlePostLike';
import { editPost } from '../firebase';

export function PostCard({ post, setAddedPost }) {
  const { isAuth, userId, userData, setUserData } = useUserContext();
  const [processingClick, setProcessingClick] = useState(false);
  const [userLikedPost, setUserLikedPost] = useState(null);

  useEffect(() => {
    setUserLikedPost(getUserLikedPost(post.id, userData));
  }, [userId, post, userData]);

  const handleClick = async (isLike) => {
    if (isAuth) {
      setProcessingClick(true);

      const postCopy = { ...post };
      let likes = postCopy.likes;
      let dislikes = postCopy.dislikes;
      let like = false;
      let dislike = false;

      if (isLike) {
        like = userLikedPost ? !userLikedPost.like : true;

        if (like) {
          likes++;
        } else {
          likes--;
        }
      } else {
        dislike = userLikedPost ? !userLikedPost.dislike : true;

        if (dislike) {
          dislikes++;
        } else {
          dislikes--;
        }
      }

      postCopy.likes = likes;
      postCopy.dislikes = dislikes;

      await editPost(post.id, postCopy);
      await saveLikedPost(userId, post.id, { like, dislike }, userData, setUserData);
      setProcessingClick(false);
      setAddedPost(true);
    } else {
      alert('É necessário estar logado para curtir / descurtir o tópico');
    }
  };

  return (
    <div className="post-card-container">
      <p>{post.title}</p>
      <p>
        {post.description.length > 100 ? post.description.slice(0, 100) + '...' : post.description}
      </p>
      <div className="post-card-like-container">
        <p className="post-card-like">
          {post.likes}
          <button onClick={() => handleClick(true)} disabled={processingClick}>
            <FaRegThumbsUp />
          </button>
        </p>
        <p className="post-card-like">
          {isAuth && userId === post.user && post.dislikes}
          <button onClick={() => handleClick(false)} disabled={processingClick}>
            <FaRegThumbsDown />
          </button>
        </p>

        <p className="post-card-like">
          {post.comments ? post.comments.length : 0}
          <FaRegCommentAlt />
        </p>
      </div>

      {isAuth && (
        <Link to={`/post/${post.id}`} className="link-detail-page">
          Ver mais
        </Link>
      )}
    </div>
  );
}
