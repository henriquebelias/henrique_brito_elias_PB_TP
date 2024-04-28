import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../firebase';
import { useUserContext } from '../context';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

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

  useEffect(() => {
    const fetchPosts = async () => {
      const resPost = await getPost(id);

      setPost({ ...resPost, comments: [] });
    };

    fetchPosts();
  }, [id]);

  return (
    <main className="w-2/4 mx-auto my-8">
      <div className="flex flex-col gap-8">
        <h2 className="text-xl text-center my-8">{post.title}</h2>
        <div>
          <p>Publicado em: {new Date(post.publicationDate).toLocaleDateString()}</p>
          <p>
            Palavras-chave: {post.keywords.length > 1 ? post.keywords.join(', ') : post.keywords[0]}
          </p>
        </div>
        <p>{post.description}</p>
        <div className="flex gap-2">
          <p className="flex gap-2 items-center">
            {post.likes}
            <FaRegThumbsUp />
          </p>
          {userId === post.user && (
            <p className="flex gap-2 items-center">
              {post.dislikes}
              <FaRegThumbsDown />
            </p>
          )}
        </div>
        <Link to="/" className="border py-2 px-8 block w-fit">
          Voltar
        </Link>
        <div>
          <p>Comentários: </p>
          {post.comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
