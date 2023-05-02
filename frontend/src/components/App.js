import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../utils/Api';
import { authApi } from '../utils/auth';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Container from './Container';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [tooltipData, setTooltipData] = React.useState({
    statusText: '',
    isOk: false,
  });
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: '',
  });

  const navigate = useNavigate();

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen ||
    isTooltipOpen;

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUser()
        .then((res) => {
          setCurrentUser(res);
          setUserEmail(res.email)
        })
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((res) => {
          setCards(res.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);

    api
      .editUser(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);

    api
      .editAvatar(avatarLink)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true);

    api
      .addCard(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegistration(regData) {
    setIsLoading(true);

    authApi
      .signUp(regData)
      .then((res) => {
        handleInfoTooltip({ statusText: 'Вы успешно зарегистрировались!', isOk: true });
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          handleInfoTooltip({
            statusText: 'Некорректно заполнено одно из полей или аккаунт уже существует',
            isOk: false,
          });
        } else {
          handleInfoTooltip({
            statusText: 'Что-то пошло не так! Попробуйте ещё раз.',
            isOk: false,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(logData) {
    setIsLoading(true);

    authApi
      .signIn(logData)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        setUserEmail(logData.email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          handleInfoTooltip({
            statusText: 'Не передано одно из полей',
            isOk: false,
          });
        } else if (err === 'Ошибка: 401') {
          handleInfoTooltip({
            statusText: 'Неверный email/пароль или пользователь не найден',
            isOk: false,
          });
        } else {
          handleInfoTooltip({
            statusText: 'Что-то пошло не так! Попробуйте ещё раз.',
            isOk: false,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      authApi
        .checkToken(localStorage.getItem('token'))
        .then((res) => {
          setIsLoggedIn(true);
          navigate('/', { replace: true });
          setUserEmail(res.email);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleInfoTooltip(data) {
    setIsTooltipOpen(true);
    setTooltipData(data);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setUserEmail('');
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Container class="container_place_header">
        <Header onLogout={handleLogout} email={userEmail} />
      </Container>
      <Container>
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegistration} isLoading={isLoading} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
          <Route
            path="*"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onClickCard={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
        </Routes>
      </Container>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

      <PopupWithForm
        title="Вы уверены?"
        name="card-deletion"
        buttonText="Да"
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <InfoTooltip isOpen={isTooltipOpen} tooltipData={tooltipData} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
