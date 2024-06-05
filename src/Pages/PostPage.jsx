import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { editPost, getPost, getUser, updatePost, updateUser } from '../firebase';
import { useUserContext } from '../context';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { TbAlertTriangle } from 'react-icons/tb';
import { getUserLikedPost, saveLikedPost } from '../utils/handlePostLike';
import './PostPage.css';

export function PostPage() {
  const { id } = useParams();
  const { userId, userData, setUserData, users, isAuth, fetchUsers } = useUserContext();
  const [post, setPost] = useState({
    title: '',
    publicationDate: '',
    keywords: [],
    description: '',
    likes: 0,
    dislikes: 0,
    comments: []
  });
  const [newComment, setNewComment] = useState('');
  const [processingClick, setProcessingClick] = useState(false);
  const [userLikedPost, setUserLikedPost] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const resPost = await getPost(id);

    setPost({ ...resPost, comments: resPost.comments || [] });
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  useEffect(() => {
    setUserLikedPost(getUserLikedPost(post.id, userData));
  }, [userId, post, userData]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewComment(value);

    const atIndex = value.lastIndexOf('@');

    if (atIndex > -1) {
      const query = value.slice(atIndex + 1);

      const matchedUsers = users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredUsers(matchedUsers);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectUser = (user) => {
    const atIndex = newComment.lastIndexOf('@');
    const newValue = newComment.slice(0, atIndex + 1) + user.username;
    setNewComment(newValue);
    setShowSuggestions(false);
  };

  const handleAddComment = async () => {
    if (newComment) {
      const postCopy = { ...post };
      postCopy.comments.push(newComment);

      setPost(postCopy);
      setNewComment('');

      await editPost(id, postCopy);
      await updateUser(userId, { points: userData.points + 2 });
      if (post.user !== userId) {
        const postUser = await getUser(post.user);
        await updateUser(post.user, { points: postUser.points + 2 });
      }
      await fetchUsers();
    }
  };

  const handleClick = async (isLike) => {
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
    setPost(postCopy);
  };

  const handleReport = async () => {
    await updatePost(id, { wasReported: true });
    await fetchPosts();
  };

  return (
    <main className="post-page-main-container">
      <div className="post-page-container">
        <h2 className="post-page-title">{post.title}</h2>
        <button className="report-button" onClick={handleReport} title="Reportar tópico">
          <TbAlertTriangle size={32} />
        </button>
        {post.user === userId && post.wasReported && (
          <p style={{ color: 'red' }}>O seu tópico foi reportado por algum usuário.</p>
        )}
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
            <button onClick={() => handleClick(true)} disabled={processingClick}>
              <FaRegThumbsUp />
            </button>
          </p>
          <p className="like-text">
            {userId === post.user && post.dislikes}
            <button onClick={() => handleClick(false)} disabled={processingClick}>
              <FaRegThumbsDown />
            </button>
          </p>
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
            onChange={handleChange}></textarea>

          {showSuggestions && (
            <ul className="suggestions">
              {filteredUsers.map((user, index) => (
                <li key={index} onClick={() => handleSelectUser(user)}>
                  {user.username}
                </li>
              ))}
            </ul>
          )}

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
