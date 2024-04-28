import { useState } from 'react';
import { Input } from './Input';
import { useUserContext } from '../context/';
import { addPost } from '../firebase';

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
    <div className="h-screen w-screen bg-black bg-opacity-80 absolute top-0">
      <div className="border border-black bg-white p-8 relative top-32 w-3/5 left-[22%] sm:w-2/3 sm:left-[20%] 2xl:w-2/4 2xl:left-[30%]">
        <div className="flex place-content-between">
          <h3 className="text-2xl my-4 max-[459px]:text-base">Adicionar Tópico</h3>
          <p
            className="text-2xl my-4 cursor-pointer max-[459px]:text-base"
            onClick={() => handleOpen('addTopic', false)}>
            X
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <Input id="title" type="text" handleChange={handleChange} value={topicObj.title}>
            Título:
          </Input>

          <div className="flex flex-col gap-2  max-[459px]:text-sm">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              type="text"
              name="description"
              className="border border-black p-4  max-[459px]:p-2"
              rows={10}
              onChange={handleChange}
              value={topicObj.description}></textarea>
          </div>

          <div className="flex flex-col gap-2  max-[459px]:text-sm">
            <label htmlFor="keywords">Palavras-chave:</label>
            <textarea
              id="keywords"
              type="text"
              name="keywords"
              className="border border-black p-4  max-[459px]:p-2"
              rows={10}
              onChange={handleChange}
              value={topicObj.keywords}></textarea>
          </div>

          <button
            type="button"
            className="border border-black w-fit self-center p-3"
            onClick={handleClick}>
            ADICIONAR
          </button>
        </div>
      </div>
    </div>
  );
}
