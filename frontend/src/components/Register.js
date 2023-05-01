import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Form from './Form';

const Register = ({ onRegister, isLoading }) => {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="authentication">
      <h2 className="authentication__title">Регистрация</h2>
      <Form
        name="login"
        buttonText="Зарегистрироваться"
        buttonTheme="light"
        loadingText="Регистрация..."
        isLoading={isLoading}
        onSubmit={handleSubmit}>
        <input
          className="input input_type_auth form__email-input"
          id="email-input"
          type="email"
          name="email"
          onChange={handleChange}
          value={values.email || ''}
          minLength={3}
          maxLength={30}
          placeholder="Email"
          required
        />
        <input
          className="input input_type_auth form__password-input"
          id="password-input"
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password || ''}
          minLength={2}
          maxLength={30}
          placeholder="Пароль"
          required
        />
      </Form>

      <Link className="authentication__link" to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
};

export default Register;
