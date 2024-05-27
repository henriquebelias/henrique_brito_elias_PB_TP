import React from 'react';
import { useState } from 'react';
import { Input } from './Input';
import { useUserContext } from '../context/';
import { addPost } from '../firebase';
import './AddTopicModal.css';

export function AddTopicModal({ handleOpen, setAddedPost }) {
  const { userId } = useUserContext();
  const [topicObj, setTopicObj] = useState({ title: '', description: '', keywords: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setTopicObj((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  };

  const handleClick = async () => {
    const { title, description, keywords } = topicObj;

    if (title && description && keywords) {
      const sentObject = {
        title,
        description,
        createdAt: new Date().getTime(),
        publicationDate: new Date().getTime(),
        user: userId,
        keywords: keywords.split(','),
        comments: [],
        likes: 0,
        dislikes: 0
      };

      addPost(sentObject);

      setAddedPost(true);
    }

    handleOpen('addTopic', false);
  };

  return (
    <div className="modal-bg">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Adicionar Tópico</h3>
          <p className="close-icon" onClick={() => handleOpen('addTopic', false)}>
            X
          </p>
        </div>
        <div className="modal-input-container">
          <Input id="title" type="text" handleChange={handleChange} value={topicObj.title}>
            Título:
          </Input>

          <div className="modal-textarea-container">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              type="text"
              name="description"
              className="modal-textarea"
              rows={10}
              onChange={handleChange}
              value={topicObj.description}></textarea>
          </div>

          <div className="modal-textarea-container">
            <label htmlFor="keywords">Palavras-chave:</label>
            <textarea
              id="keywords"
              type="text"
              name="keywords"
              className="modal-textarea"
              rows={10}
              onChange={handleChange}
              value={topicObj.keywords}></textarea>
          </div>

          <button type="button" className="modal-button" onClick={handleClick}>
            ADICIONAR
          </button>
        </div>
      </div>
    </div>
  );
}
