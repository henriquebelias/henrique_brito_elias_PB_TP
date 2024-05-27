import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { useUserContext } from '../context';

jest.mock('../context', () => ({
  useUserContext: jest.fn()
}));

describe('LandingPage', () => {
  it('should render the LandingPage component', () => {
    const setAddedPost = jest.fn();
    useUserContext.mockReturnValue({ username: 'Usuário', logout: jest.fn(), isAuth: true });
    const { getByText } = render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    expect(getByText('Fórum')).toBeInTheDocument();

    expect(getByText('CRIAR TÓPICO')).toBeInTheDocument();
    expect(getByText('Usuário')).toBeInTheDocument();

    expect(setAddedPost).not.toHaveBeenCalled();

    expect(getByText('Ranking de pontuações')).toBeInTheDocument();
    expect(getByText('Lista de Tópicos')).toBeInTheDocument();
  });
});
