import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AddTopicModal } from '../components/AddTopicModal';
import * as firebase from '../firebase';

jest.spyOn(firebase, 'addPost').mockImplementationOnce(() => {});

jest.mock('../context/', () => ({
  useUserContext: jest.fn(() => ({ userId: 'mockedUserId' }))
}));

describe('AddTopicModal', () => {
  it('render AddTopicModal component', () => {
    const setAddedPost = jest.fn();
    const handleOpen = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddTopicModal handleOpen={handleOpen} setAddedPost={setAddedPost} />
    );

    fireEvent.change(getByLabelText('Título:'), { target: { value: 'Título do tópico' } });
    fireEvent.change(getByLabelText('Descrição:'), { target: { value: 'Descrição do tópico' } });
    fireEvent.change(getByLabelText('Palavras-chave:'), { target: { value: 'lorem, ipsum' } });
    fireEvent.click(getByText('ADICIONAR'));

    expect(setAddedPost).toHaveBeenCalledWith(true);
    expect(handleOpen).toHaveBeenCalledWith('addTopic', false);
    expect(firebase.addPost).toHaveBeenCalledWith({
      title: 'Título do tópico',
      description: 'Descrição do tópico',
      createdAt: expect.any(Number),
      publicationDate: expect.any(Number),
      user: 'mockedUserId',
      keywords: ['lorem', ' ipsum'],
      comments: [],
      likes: 0,
      dislikes: 0
    });
  });
});
