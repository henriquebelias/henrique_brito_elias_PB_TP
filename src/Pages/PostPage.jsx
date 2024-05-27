import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { editPost, getPost } from '../firebase';
import { useUserContext } from '../context';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import './PostPage.css';

export function PostPage() {
  const { id } = useParams();
  const { userId } = useUserContext();
  const [post, setPost] = useState({
    title: '',
    publicationDate: '',
    keywords: [],
    description: '',
    likes: 0,
    comments: []
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const resPost = await getPost(id);

      setPost({ ...resPost, comments: resPost.comments || [] });
    };

    fetchPosts();
  }, [id]);

  const handleAddComment = () => {
    if (newComment) {
      const postCopy = { ...post };
      postCopy.comments.push(newComment);

      setPost(postCopy);
      setNewComment('');

      editPost(id, postCopy);
    }
  };

  return (
    <main className="post-page-main-container">
      <div className="post-page-container">
        <h2 className="post-page-title">{post.title}</h2>
        <div>
          <p>Publicado em: {new Date(post.publicationDate).toLocaleDateString()}</p>
          <p>
            Palavras-chave: {post.keywords.length > 1 ? post.keywords.join(', ') : post.keywords[0]}
          </p>
        </div>
        <p>{post.description}</p>
        <div className="likes-container">
          <p className="like-text">
            {post.likes}
            <FaRegThumbsUp />
          </p>
          {userId === post.user && (
            <p className="like-text">
              {post.dislikes}
              <FaRegThumbsDown />
            </p>
          )}
        </div>
        <Link to="/" className="post-button">
          Voltar
        </Link>
        <div className="post-page-container">
          <label htmlFor="commentBox">Adicionar comentário</label>
          <textarea
            id="commentBox"
            name="commentBox"
            rows="6"
            className="border p-2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}></textarea>
          <button type="button" className="post-button" onClick={handleAddComment}>
            Submeter
          </button>
        </div>
        <div className="post-page-container">
          <p>Comentários: </p>

          <div className="post-page-container">
            {post.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
