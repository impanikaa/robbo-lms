import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__left">
          <Link to="/" className="footer__link">Главная</Link>
          <Link to="/courses" className="footer__link">Курсы</Link>
          <Link to="/editor" className="footer__link">Редактирование курсов</Link>
        </div>
        <div className="footer__divider"></div>
        <div className="footer__right">
          <span className="footer__text">Это футер</span>
          <span className="footer__logo">РОББО</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;