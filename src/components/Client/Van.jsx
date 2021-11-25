import React from "react";

import VanImage from '../../images/van.png';

const Van = ({ asientos = [], salida }) => {
  const asiento = [0,1,0,1,1,0,0,1,0,0,0,0,0,0]
  
  return (
    <div className="van">
      <div className="van__schedule">
        Salida: {salida}
      </div>
      <div className="van-car">
        <img className="van-car__image" src={VanImage} alt="Imagen de la van" />
        <div className="van-car__seat">
          {
            asiento.map((a, i) => <i key={i} className="fa fa-chair" style={{ color: a == 1 ? '#EA028C' : '#ccc' }} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Van;