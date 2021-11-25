import React from "react";

import Image from '../images/contactenos.png';

const Contact = () => {
  return (
    <section className="container contact" id="contact">
      <div className="contact-text">
        <h2>Contactanos</h2>
        <p>A nuestra operadora de servicio o ubicanos en nuestras redes sociales para más información con gusto le atendemos</p>
        <button className="btn btn--pink">(+51) 900 191 126</button>
      </div>
      <img className="contact__image" src={Image} alt="Imagen contactanos" />
    </section>
  )
}

export default Contact;