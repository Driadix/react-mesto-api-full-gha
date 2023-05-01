import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const avatarLinkRef = React.createRef();

  React.useEffect(() => {
    avatarLinkRef.current.value = '';
    // eslint-disable-next-line
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      buttonText="Сохранить"
      loadingText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        className="input form__job-input"
        id="urlAva-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required=""
        ref={avatarLinkRef}
      />
      <span className="input-error urlAva-input-error" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
