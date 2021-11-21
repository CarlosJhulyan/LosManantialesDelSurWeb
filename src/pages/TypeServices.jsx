import React from "react";
import { Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

import DashboardClient from "../Layout/DashboardClient";

import Pasaje from '../images/pasajes.jpg';
import Paquete from '../images/paqueteria.jpg';

const TypeServices = () => {
  return(
    <DashboardClient title="Seleccione el servicio deseado" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, omnis debitis assumenda voluptate deserunt illum cumque molestias quasi accusamus repudiandae ratione porro, ex vitae dolor sed totam amet ea recusandae. Unde recusandae in delectus tenetur vero, dolor at laboriosam officia enim deserunt a veritatis tempore quis nisi ipsa quae pariatur fuga sed eveniet.">
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/cliente/registro?servicio=registro-paquete">Paqueteria</Link>
        </Button>
        <Button type="primary">
          <Link to="/cliente/registro?servicio=compra-pasaje">Pasaje</Link>
        </Button>
      </Row>
      <Row style={{marginTop: 20}} justify="space-around">
        <Col span="10">
          <img className="type-service__image" src={Paquete} alt="Boleto pasaje" />
        </Col>
        <Col span="10">
          <img className="type-service__image" src={Pasaje} alt="Paqueterias" />
        </Col>
      </Row>
    </DashboardClient>
  )
}

export default TypeServices;



