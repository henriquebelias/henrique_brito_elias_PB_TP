import { useUserContext } from '../context';

export function RankingContainer() {
  const { users } = useUserContext();

  return (
    <section className="border border-black p-3">
      <h2 className="text-2xl">Ranking de pontuações</h2>
      <ol className="list-decimal px-6 py-3">
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ol>
    </section>
  );
}
