import { Link } from 'react-router-dom';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { useUserContext } from '../context/';

export function PostCard({ post }) {
  const { isAuth, userId } = useUserContext();

  return (
    <div className="flex flex-col gap-2 border border-black lg:col-span-2 p-3">
      <p>{post.title}</p>
      <p>{post.description}</p>
      <div className="flex gap-4">
        <p className="flex gap-2 items-center">
          {post.likes}
          <FaRegThumbsUp />
        </p>
        {isAuth && userId === post.user && (
          <p className="flex gap-2 items-center">
            {post.dislikes}
            <FaRegThumbsDown />
          </p>
        )}
      </div>

      {isAuth && (
        <Link to={`/post/${post.id}`} className="border py-2 px-8 block w-fit">
          Ver mais
        </Link>
      )}
    </div>
  );
}
