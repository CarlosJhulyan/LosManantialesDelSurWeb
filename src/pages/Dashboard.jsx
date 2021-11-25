import React from "react";
import { Row, Button, Col, Select } from "antd";
import { Link } from "react-router-dom";

import DashboardClient from "../Layout/DashboardClient";

import Pasaje from '../images/pasajes.jpg';
import Paquete from '../images/paqueteria.jpg';
import Tracking from '../images/tracking.jpg';

const Dashboard = () => {
  const Option = Select.Option;

  return (
    <DashboardClient title="Dashboard" description="Este es tu centro de servicios, seleccione su origen y destino seguidamente su tipo de servicio.">
      <Row justify="space-around">
        <Col span={9}>
          <p><b>Seleccione su ubicación actual:</b></p>
          <Select showSearch={true} style={{ width: '100%' }} defaultValue="Origen">
            <Option value="ayacucho" >Ayacucho</Option>
            <Option value="puquio" >Puquio</Option>
            <Option value="coracora" >Coracora</Option>
          </Select>
        </Col>
        <Col span={9}>
          <p><b>Seleccione destino final:</b></p>
          <Select showSearch={true} style={{ width: '100%' }} defaultValue="Destino">
            <Option value="ayacucho" >Ayacucho</Option>
            <Option value="puquio" >Puquio</Option>
            <Option value="coracora" >Coracora</Option>
          </Select>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Seleccione el Tipo de Servicio que Desea:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/cliente/registro-paquete">Paqueteria</Link>
        </Button>
        <Button type="primary">
          <Link to="/cliente/compra-pasaje">Pasaje</Link>
        </Button>
        <Button type="primary">
          <Link to="/cliente/seguimiento-paquete">Seguimiento</Link>
        </Button>
      </Row>
      <Row style={{ marginTop: 20 }} justify="space-around">
        <Col span="7">
          <img className="type-service__image" src={Paquete} alt="Boleto pasaje" />
        </Col>
        <Col span="7">
          <img className="type-service__image" src={Pasaje} alt="Paqueterias" />
        </Col>
        <Col span="7">
          <img className="type-service__image" src={Tracking} alt="Paqueterias" />
        </Col>
      </Row>
    </DashboardClient>
  )
}

export default Dashboard;
