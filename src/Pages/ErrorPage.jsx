import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

export function ErrorPage() {
  return (
    <div className="error-page-container">
      <h1 className="error-page-title">Erro</h1>
      <p className="error-page-subtitle">Página não encontrada!</p>

      <Link to="/" className="error-page-return-link">
        VOLTAR
      </Link>
    </div>
  );
}
