import React from 'react';
import { PostsListPage } from '../components/PostsListPage';
import { RankingContainer } from '../components/RankingContainer';
import './PostsPage.css';

export function PostsPage({ addedPost, setAddedPost }) {
  return (
    <section className="section-container">
      <PostsListPage addedPost={addedPost} setAddedPost={setAddedPost} />
      <RankingContainer />
    </section>
  );
}
