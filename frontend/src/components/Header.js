import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Header = ({ onLogout, email }) => {
  return (
    <header className="header">
      <div className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to={'/sign-in'} className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to={'/sign-up'} className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{email}</p>
              <button className="button header__link" onClick={onLogout}>
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
};

export default Header;
