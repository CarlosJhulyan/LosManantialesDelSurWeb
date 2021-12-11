import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "antd";

import { Context } from "../../context";
import Van from "./Van";

const ContainerVans = ({ vehicules = [], total }) => {
  const [vehiculeSelect, setVehiculeSelect] = useState(0);
  const { setData, globalData } = useContext(Context);

  if (vehicules.length === 1) {
    vehicules[0].salida = "11 am";
  } else if (vehicules.length === 2) {
    vehicules[0].salida = "6 am";
    vehicules[1].salida = "3 pm";
  } else if (vehicules.length === 3) {
    vehicules[0].salida = "6 am";
    vehicules[1].salida = "2 pm";
    vehicules[2].salida = "8 pm";
  } else if (vehicules.length === 4) {
    vehicules[0].salida = "6 am";
    vehicules[1].salida = "12 pm";
    vehicules[2].salida = "4 pm";
    vehicules[3].salida = "9 pm";
  }

  useEffect(() => {
    setData({
      ...globalData,
      paquete: null,
      pasaje: {
        ...globalData.pasaje,
        vehiculoPasaje: vehicules[vehiculeSelect].id
      }
    });
  }, [])

  const handleChange = e => {
    setVehiculeSelect(e.target.dataset.id);
    const { id } = vehicules[e.target.dataset.id];
    setData({
      ...globalData,
      pasaje: {
        vehiculoPasaje: id
      }
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <Row justify="space-around">
        {
          vehicules.map((vehicule, key) => 
          <div data-id={key} key={key}className="van__schedule" onClick={handleChange} style={{ background: key == vehiculeSelect && "lime" }}>
            Salida: {vehicule.salida}
          </div>)
        }
      </Row>
      <div className="container-vans">
        <Van total={total} {...vehicules[vehiculeSelect]} />
      </div>
    </div>
  )
}

export default ContainerVans;