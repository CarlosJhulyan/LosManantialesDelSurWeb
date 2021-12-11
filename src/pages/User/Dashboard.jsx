import React from "react";
import { Row, Button } from "antd";
import { Link } from "react-router-dom";

import DashboardUser from "../../Layout/DashboardUser";

const Dashboard = () => {
  return (
    <DashboardUser title="Dashboard Usuarios">
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Estado de paquetes y códigos:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/usuario/estados">Estado de paquetes</Link>
        </Button>
        <Button type="primary">
          <Link to="/usuario/codigos">Código de verificación</Link>
        </Button>
      </Row>
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Listado y actualización:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/usuario/clientes">Lista de Clientes</Link>
        </Button>
        <Button type="primary">
          <Link to="/usuario/usuarios">Lista de Usuarios</Link>
        </Button>
      </Row>
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Precios de asientos, viaje y paquetería:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/usuario/tarifas">Tarifa de asientos</Link>
        </Button>
        <Button type="primary">
          <Link to="/usuario/precios">Precios</Link>
        </Button>
      </Row>
    </DashboardUser>
  );
};

export default Dashboard;
