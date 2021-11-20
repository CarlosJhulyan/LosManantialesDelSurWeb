import React from "react";
const Footer = () => {
	return (
		<footer class="pie-pagina">
		<div class="grupo-1">
			<div class="box">
				<h2>LOS MANANTIALES DEL SUR</h2>
				<figure>
					<a href="#"><img src="bus2.png"/></a>
				</figure>
			</div>
			<div class="box">
				<h2>UBICANOS</h2>
				<p>Huamanga</p>
				<p>Puquio</p>
				<p>Coracora</p>
				<p>Pauza</p>
				<p>Huanta</p>
			</div>
			<div class="box">
				<h2>SIGUENOS</h2>
				<div class="red-social">
					<a href="https://web.facebook.com/Manantiales-Del-Sur-1352976334841458" class="icon-red" target="_blank"><img src="fb.png" width="45" height="45"/></a>
					<a href="#" class="icon-red" target="_blank"><img src="twiter.png" width="45" height="45"/></a>
					<a href="#" class="icon-red" target="_blank"><img src="IM.png" width="45" height="45"/></a>
					<img src="wts.png" width="45" height="45"/>
					<p>983282381</p>
				</div>
			</div>
		</div>
		<div class="grupo-2">
			<small>&copy; 2021 <b>Los Manantiales</b> - Todos los derechos reservados</small>
		</div>
	</footer>
	)
} 

export default Footer;