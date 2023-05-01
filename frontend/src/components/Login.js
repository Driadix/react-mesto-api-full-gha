import React from 'react';
import { useForm } from '../hooks/useForm';
import Form from './Form';

const Login = ({ onLogin, isLoading }) => {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="authentication">
      <h2 className="authentication__title">Вход</h2>
      <Form
        name="login"
        buttonText="Войти"
        buttonTheme="light"
        loadingText="Вход..."
        isLoading={isLoading}
        onSubmit={handleSubmit}>
        <input
          className="input input_type_auth form__email-input"
          id="email-input"
          type="email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
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
          value={values.password || ''}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          placeholder="Пароль"
          required
        />
      </Form>
    </div>
  );
};

export default Login;
