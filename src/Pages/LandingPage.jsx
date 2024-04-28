import { Routes, Route } from 'react-router-dom';
import { UserControl } from '../components/UserControl';
import { PostsPage } from './PostsPage';
import { ErrorPage } from './ErrorPage';
import { PostPage } from './PostPage';
import { useState } from 'react';

export function LandingPage() {
  const [addedPost, setAddedPost] = useState(false);

  return (
    <>
      <h1 className="text-4xl font-bold underline text-center mt-4">Fórum</h1>
      <UserControl setAddedPost={setAddedPost} />
      <main>
        <Routes>
          <Route
            path="/"
            element={<PostsPage addedPost={addedPost} setAddedPost={setAddedPost} />}
          />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}
