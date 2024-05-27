import React from 'react';
import { useUserContext } from '../context';
import './RankingContainer.css';

export function RankingContainer() {
  const { users } = useUserContext();

  return (
    <section className="ranking-section">
      <h2 className="ranking-title">Ranking de pontuações</h2>
      <ol className="ranking-list">
        {users && users.map((user, index) => <li key={index}>{user.username}</li>)}
      </ol>
    </section>
  );
}
