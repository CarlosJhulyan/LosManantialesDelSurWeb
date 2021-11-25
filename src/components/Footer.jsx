import React from "react";

import Logo from '../logotipo-white.svg';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-1">
				<div className="box">
					<h2>TU EMPRESA DE CONFIANZA</h2>
					<figure>
						<a href="#"><img src={Logo} /></a>
					</figure>
				</div>
				<div className="box">
					<h2>SUCURSALES</h2>
					<p>Huamanga</p>
					<p>Puquio</p>
					<p>Coracora</p>
					<p>Pauza</p>
					<p>Huanta</p>
				</div>
				<div className="box">
					<h2>SIGUENOS</h2>
					<div class="social">
						<a href="https://web.facebook.com/Manantiales-Del-Sur-1352976334841458" class="icon-red" target="_blank"><i className="fa fa-facebook" /></a>
						<a href="#" class="icon-red" target="_blank"><i className="fa fa-twitter" /></a>
						<a href="#" class="icon-red" target="_blank"><i className="fa fa-instagram" /></a>
						<a href="#" class="icon-red" target="_blank"><i className="fa fa-whatsapp" /></a>
					</div>
				</div>
			</div>
			<div className="footer-2">
				<small>&copy; 2021 <b>Los Manantiales Del Sur SRL</b> - Todos los derechos reservados</small>
			</div>
		</footer>
	)
} 

export default Footer;