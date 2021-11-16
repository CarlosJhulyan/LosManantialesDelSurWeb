import React from "react";

import Puquio from '../images/puquio.jpg';
import Huamanga from '../images/huamanga.jpg';
import Coracora from '../images/coracora.jpg';
import Pauza from '../images/pauza.jpg';

const OurAgencies = () => {
  return (
    <section className="container our-agencies">
      <h2>Nuestras Agencias</h2>
      <div className="cards-agencie">
        <div className="card-agencie">
          <div className="card-agencie__title">
            <img src={Puquio} alt="Imagen de la ciudad de Puquio" />
            <span>
              <p>sede</p>
              <b>PUQUIO</b>
            </span>
          </div>
          <h4>Sede Puquio</h4>
          <p>Horario de atención de lunes a viernes: 9am-9pm</p>
          <p>Dirección: Jr. Manankanchu Nro. 123</p>
        </div>

        <div className="card-agencie">
          <div className="card-agencie__title">
            <img src={Huamanga} alt="Imagen de Huamanga" />
            <span>
              <p>sede</p>
              <b>HUAMANGA</b>
            </span>
          </div>
          <h4>Sede Huamanga</h4>
          <p>Horario de atención de lunes a viernes: 8am-10pm</p>
          <p>Dirección: Jr. Las Palmas Nro. 954</p>
        </div>

        <div className="card-agencie">
          <div className="card-agencie__title">
            <img src={Coracora} alt="Imagen de paquete" />
            <span>
              <p>sede</p>
              <b>CORACORA</b>
            </span>
          </div>
          <h4>Sede Coracora</h4>
          <p>Horario de atención de lunes a viernes: 9am-8pm</p>
          <p>Dirección: Av. Bolognesi Nro. 342</p>
        </div>

        <div className="card-agencie">
          <div className="card-agencie__title">
            <img src={Pauza} alt="Imagen de paquete" />
            <span>
              <p>sede</p>
              <b>PAUZA</b>
            </span>
          </div>
          <h4>Sede Pauza</h4>
          <p>Horario de atención de lunes a viernes: 9am-8pm</p>
          <p>Dirección: Jr. Fernando Belaunde Tery Nro. 444</p>
        </div>
      </div>
    </section>
  )
}

export default OurAgencies;