import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App.jsx test', () => {
  it('should render the initial page', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(getByText('Fórum')).toBeInTheDocument();
    expect(getByText('REGISTRAR')).toBeInTheDocument();
    expect(getByText('LOGIN')).toBeInTheDocument();
    expect(getByText('Lista de Tópicos')).toBeInTheDocument();
    expect(getByText('Ranking de pontuações')).toBeInTheDocument();
  });
});
