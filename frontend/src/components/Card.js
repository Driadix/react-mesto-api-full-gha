import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like === currentUser._id);

  const cardLikeButtonClassName = `button element__like-button ${
    isLiked && 'element__like-button_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          className="button element__delete-button"
          type="button"
          aria-label="Удалить элемент"
          onClick={handleDeleteClick}></button>
      )}
      <div className="element__image-container" onClick={handleClick}>
        <img className="element__image" src={card.link} alt={`Изображение ${card.name}`} />
      </div>
      <div className="element__text-box">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Добавить лайк"
            onClick={handleLikeClick}></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
