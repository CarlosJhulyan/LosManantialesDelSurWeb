import React from "react";

import Van from "./Van";

const ContainerVans = ({ vehicules = [], total }) => {
  if (vehicules.length === 1) {
    vehicules[0].salida = "11 am";
  } else if (vehicules.length === 2) {
    vehicules[0].salida = "6 am";
    vehicules[1].salida = "3 pm";
  } else if (vehicules.length === 3) {
    vehicules[0].salida = "6 am";
    vehicules[1].salida = "2 pm";
    vehicules[2].salida = "8 pm";
  }

  return (
    <div className="container-vans">
      {
        vehicules.map(vehicule => <Van total={total} key={vehicule.id} salida={vehicule.salida} {...vehicule} />)
      }
    </div>
  )
}

export default ContainerVans;