import React from 'react';
import Popup from './Popup';

const ImagePopup = ({ card, onClose, isOpen }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="image">
      <figure className="popup__image-container">
        <img src={card.link} alt={`Изображение ${card.name}`} className="popup__image" />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
};

export default ImagePopup;
