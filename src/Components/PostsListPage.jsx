import React from 'react';
import { useState, useEffect } from 'react';
import { PostsList } from './PostsList';
import { getPosts } from '../firebase';
import './PostsListPage.css';

export function PostsListPage({ addedPost, setAddedPost }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const posts = await getPosts();

    if (posts) {
      const postsSorted = Object.entries(posts)
        .map(([id, post]) => ({ ...post, id }))
        .toSorted(({ createdAt: firstValue }, { createdAt: secondValue }) => {
          if (firstValue > secondValue) return -1;
          if (firstValue < secondValue) return 1;
          return 0;
        });

      setPosts(postsSorted);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (addedPost) {
      fetchPosts();
      setAddedPost(false);
    }
  }, [addedPost, setAddedPost]);

  return (
    <section className="posts-section">
      <h2 className="topic-list-title">Lista de Tópicos</h2>
      <PostsList posts={posts} />
    </section>
  );
}
