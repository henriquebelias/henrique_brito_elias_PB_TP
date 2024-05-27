import React from 'react';
import { PostCard } from './PostCard';
import './PostsList.css';

export function PostsList({ posts }) {
  return (
    <div className="posts-list-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
