const Form = ({ name, buttonText, buttonTheme, loadingText, isLoading, onSubmit, children }) => {
  return (
    <form
      className={`form form_type_${name}`}
      action="#"
      name={`profile-${name}-form`}
      onSubmit={onSubmit}>
      {children}
      <button
        className={`button form__save-button form__save-button_theme_${buttonTheme}`}
        type="submit"
        aria-label={buttonText}>
        {isLoading ? loadingText : buttonText}
      </button>
    </form>
  );
};

export default Form;
