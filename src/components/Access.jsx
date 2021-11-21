import React from "react";
import { Link } from "react-router-dom";

import Image from '../images/acceso.png';
import Vector from '../images/vector4.svg';

const Access = () => {
    return(
			<div className="access">
				<img className="access__background" src={Vector} alt="Vector 4" />
				<div className="container access-container">
					<div>
						<h3 className="access-container__title">Si quieres acceder a nuestros servicios.</h3>
						<button className="btn"><Link to="/servicio">Accede aquí</Link></button>
					</div>
					<img src={Image} alt="Imagen de un paquete" />
				</div>
			</div>
    );
}

export default Access;