import React, { useContext, useState, useEffect } from "react";
import { Row, Button, Col, Select } from "antd";
import { Link } from "react-router-dom";

import DashboardUser from "../../Layout/DashboardUser";
import { Context } from "../../context";
import { getSucursal } from "../../services/Services";

const Dashboard = () => {
  const { globalData, setData } = useContext(Context);
  const [ sucursales, setsucursales ] = useState([]);
  const Option = Select.Option;

  const fetchData = async () => {
    const data = await getSucursal();
    return data;
  }

  useEffect(() => {
    fetchData().then(data => {
      setsucursales(data);
    })
  }, [])

  return (
    <DashboardUser title="Dashboard Usuarios">
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Estado de paquetes y códigos:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/usuarios/estados">Estado de paquetes</Link>
        </Button>
        <Button type="primary">
          <Link to="/usuarios/codigos">Código de verificación</Link>
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
          <Link to="/usuarios/usuarios">Lista de Usuarios</Link>
        </Button>
      </Row>
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Precios de asientos, viaje y paquetería:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary">
          <Link to="/usuarios/tarifas">Tarifa de asientos</Link>
        </Button>
        <Button type="primary">
          <Link to="/usuarios/precios">Precios</Link>
        </Button>
      </Row>
    </DashboardUser>
  );
};

export default Dashboard;
