export function RankingContainer({ userList }) {
  return (
    <div className="border border-black p-3">
      <h2>Ranking de pontuações</h2>
      <ol className="list-decimal px-6 py-3">
        {userList && userList.map((user) => <li key={user.id}>{user.username}</li>)}
      </ol>
    </div>
  );
}
