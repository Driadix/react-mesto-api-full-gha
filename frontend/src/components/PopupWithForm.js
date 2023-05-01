import React from 'react';
import Popup from './Popup';
import Form from './Form';

const PopupWithForm = ({
  title,
  name,
  buttonText,
  loadingText,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  children,
}) => {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <Form
        name={name}
        buttonText={buttonText}
        loadingText={loadingText}
        isLoading={isLoading}
        onSubmit={onSubmit}>
        {children}
      </Form>
    </Popup>
  );
};

export default PopupWithForm;
