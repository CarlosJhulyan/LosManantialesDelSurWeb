import React from "react";

import Van from "./Van";

const ContainerVans = () => {
  return (
    <div className="container-vans">
      <Van salida="6 am" />
      <Van salida="11 am" />
      <Van salida="3 pm" />
    </div>
  )
}

export default ContainerVans;