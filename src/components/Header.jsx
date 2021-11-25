import React from "react";
import Logo from '../logotipo.svg';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img className="header-menu__logo" src={Logo} alt="Logotipo Los Manantiales Del Sur SRL" />
      <menu className="header-menu">
        <ul className="header-menu-list">
          <li><a href="#about-us">Nosotros</a></li>
          <li><a href="#our-agencies">Agencias</a></li>
          <li><a href="#contact">Contactanos</a></li>
          <li><a href="#our-services">Nuestros Servicios</a></li>
          <li><Link to="/servicio">PARA CLIENTES</Link></li>
        </ul>
        <div className="header-menu-social">
          <a href="https://www.facebook.com/ETM-Manantiales-DEL-SUR-2619080004773359/" target="_blank"><i className="fa fa-facebook" /></a>
          <a href="#" target="_blank"><i className="fa fa-twitter" /></a>
          <a href="#" target="_blank"><i className="fa fa-instagram" /></a>
        </div>
      </menu>
    </header>
  )
}

export default Header;