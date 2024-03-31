import { RankingContainer } from '../Components/RankingContainer';
import { TopicListContainer } from '../Components/TopicListContainer';
import { UserControl } from '../Components/UserControl';

export function LandingPage() {
  const posts = [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    }
  ];

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mt-4">Fórum</h1>
      <UserControl />
      <main className="grid grid-cols-1 lg:grid-cols-3 m-3 gap-3">
        <TopicListContainer posts={posts} />
        <RankingContainer userList={[{ id: 0, username: 'Usuário 1' }]} />
      </main>
    </>
  );
}
