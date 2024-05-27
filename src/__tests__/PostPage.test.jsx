import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostPage } from '../pages/PostPage';
import * as firebase from '../firebase';

jest.spyOn(firebase, 'getPost').mockResolvedValue({
  title: 'Tópico 1',
  publicationDate: new Date().toISOString(),
  keywords: ['test', 'keyword'],
  description: 'Descrição do tópico',
  likes: 0,
  comments: []
});

jest.mock('../context', () => ({
  useUserContext: jest.fn().mockReturnValue({ userId: 'mockedUserId' })
}));

describe('PostPage', () => {
  it('renders PostPage component', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/post/1']}>
        <PostPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText(/Tópico 1/)).toBeInTheDocument();
      expect(getByText(/Palavras-chave:/)).toBeInTheDocument();
      expect(getByText('Descrição do tópico')).toBeInTheDocument();
      expect(getByText('Comentários:')).toBeInTheDocument();
      expect(getByText('Voltar')).toBeInTheDocument();
    });
  });
});
