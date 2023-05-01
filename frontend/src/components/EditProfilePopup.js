import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: currentUser.name,
    job: currentUser.about,
  });

  React.useEffect(() => {
    setValues({ name: currentUser.name, job: currentUser.about });
    // eslint-disable-next-line
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.job,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      loadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        className="input form__name-input"
        id="title-input"
        type="text"
        name="name"
        onChange={handleChange}
        value={values.name}
        minLength={2}
        maxLength={40}
        placeholder="Введите имя"
        required
      />
      <span className="input-error title-input-error" />
      <input
        className="input form__job-input"
        id="job-input"
        type="text"
        name="job"
        onChange={handleChange}
        value={values.job}
        minLength={2}
        maxLength={200}
        placeholder="Введите вид деятельности"
        required=""
      />
      <span className="input-error job-input-error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
