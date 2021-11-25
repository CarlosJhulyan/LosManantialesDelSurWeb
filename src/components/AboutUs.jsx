import React from "react";

import Image from '../images/Nosotros.png';
import Vector from '../images/vector3.svg';

const AboutUs = () => {
  return (
    <section className="about" id="about-us">
      <img className="about__background" src={Vector} alt="" />
      <section className="container about-container">
        <img className="about-container__image" src={Image} alt="Imagen de Nosotros" />
        <div className="about-container-text">
          <h2>Sobre Nosotros</h2>
          <p>somos una empresa con muchos annos en el transporte y envio, trabajamos de manera tradicional, actualmente innovamos para mejorar nuestro servicio para ustedes</p>
        </div>
      </section>
    </section>
  )
}

export default AboutUs;