import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="РОББО" className="header__logo-img" />
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">Главная</Link>
          <Link to="/courses" className="header__nav-link">Курсы</Link>
          <Link to="/editor" className="header__nav-link">Редактор курсов</Link>
        </nav>
        <button className="header__login-btn">Войти</button>
      </div>
    </header>
  );
};

export default Header;
