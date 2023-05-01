import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onClickCard,
  onCardLike,
  cards,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          <button className="profile__avatar-edit-button" onClick={onEditAvatar} />
          <div className="profile__information">
            <div className="profile__title-box">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="button profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            className="button profile__add-button"
            type="button"
            aria-label="Добавить карточку"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                onCardClick={onClickCard}
                card={card}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;
