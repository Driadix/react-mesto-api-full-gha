import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
    // eslint-disable-next-line
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="new-place"
      buttonText="Создать"
      loadingText="Создание..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        className="input form__name-input"
        id="name-input"
        type="text"
        name="name"
        value={values.name || ''}
        onChange={handleChange}
        minLength={2}
        maxLength={30}
        placeholder="Название"
        required
      />
      <span className="input-error name-input-error" />
      <input
        className="input form__job-input"
        id="url-input"
        type="url"
        name="link"
        value={values.link || ''}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="input-error url-input-error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
