import { PostsListPage } from '../components/PostsListPage';
import { RankingContainer } from '../components/RankingContainer';

export function PostsPage({ addedPost, setAddedPost }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 m-3 gap-3">
      <PostsListPage addedPost={addedPost} setAddedPost={setAddedPost} />
      <RankingContainer />
    </section>
  );
}
