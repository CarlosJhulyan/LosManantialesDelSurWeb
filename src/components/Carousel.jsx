import React from "react";
import { Carousel as Carouse } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Vector1 from '../images/vector1.svg';
import Carousel1 from '../images/carousel1.png';
import Carousel2 from '../images/carousel2.png';
import Carousel3 from '../images/carousel3.png';

const Carousel = () => {
  return (
    <div className="carousel-container">
      <div className="carousel__sky"></div>
      <img className="vector" src={Vector1} alt="" />
      <Carouse autoPlay={true} showStatus={false} showThumbs={false} infiniteLoop={true}>
      <div className="carousel-item">
          <img className="carousel-item__image" src={Carousel3} alt="Imagen de Carro" />
          <p className="carousel-item__description">Somos una empresa de transporte y de envio de packetes más innovadora del departamento de Ayacucho</p>
        </div>
        <div className="carousel-item">
          <img className="carousel-item__image" src={Carousel1} alt="Imagen de Carro 2" />
          <p className="carousel-item__description">Destino a todo el departamento de Ayacucho. Salidas diarias: 3am - 5am - 6am (Mañanas) y 3pm - 5pm - 7pm (Tardes)</p>
        </div>
        <div className="carousel-item">
          <img className="carousel-item__image" src={Carousel2} alt="Imagen de Carro 3" />
          <p className="carousel-item__description">Pasajes y envio de Paquetes totalmente seguros y confiables, a todo destino del departamento de Ayacucho</p>
        </div>
      </Carouse>
    </div>
  )
}

export default Carousel;