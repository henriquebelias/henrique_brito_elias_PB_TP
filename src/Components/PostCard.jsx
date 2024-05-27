import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { useUserContext } from '../context/';
import './PostCard.css';

export function PostCard({ post }) {
  const { isAuth, userId } = useUserContext();

  return (
    <div className="post-card-container">
      <p>{post.title}</p>
      <p>{post.description}</p>
      <div className="post-card-like-container">
        <p className="post-card-like">
          {post.likes}
          <FaRegThumbsUp />
        </p>
        {isAuth && userId === post.user && (
          <p className="post-card-like">
            {post.dislikes}
            <FaRegThumbsDown />
          </p>
        )}
      </div>

      {isAuth && (
        <Link to={`/post/${post.id}`} className="link-detail-page">
          Ver mais
        </Link>
      )}
    </div>
  );
}
