import React, { useContext, useState, useEffect, useRef } from "react";
import { Row, Button, Col, Select, Modal, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import DashboardClient from "../../Layout/DashboardClient";
import { Context } from "../../context";
import { getSucursal } from "../../services/Services";

import Pasaje from "../../images/pasajes.jpg";
import Paquete from "../../images/paqueteria.jpg";
import Tracking from "../../images/tracking.jpg";

const Dashboard = () => {
  const { globalData, setData } = useContext(Context);
  const [ sucursales, setsucursales ] = useState([]);
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const componentRef = useRef();
  const Option = Select.Option;

  const fetchData = async () => {
    const data = await getSucursal();
    return data;
  }

  useEffect(() => {
    fetchData().then(data => {
      setsucursales(data);
    }).catch(err => console.log(err.message));
    if (globalData.ticket)
      showModal();
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setData({
      ...globalData,
      ticket: null
    });
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: globalData.ticket && `Resumen de Servicio N° ${globalData.ticket.numeroGuia}`,
    pageStyle: `
      @page {
        size: 130mm 200mm;
      }

      @media all {
        .pagebreak {
          display: none;
        }
      }

      @media print {
        .pagebreak {
          page-break-before: always;
        }
      }
    `
  });

  return (
    <DashboardClient title="Dashboard" description="Este es tu centro de servicios, seleccione su origen y destino seguidamente su tipo de servicio."
    >
      <Row justify="space-around">
        <Col span={9}>
          <p>
            <b>Seleccione su ubicación actual:</b>
          </p>
          <Select showSearch={true}
                  style={{ width: "100%" }}
                  onChange={value => setData({ ...globalData, origen: value })}
                  defaultValue={globalData.origen || "Origen"}>
            {
              sucursales.map(sucursal => <Option value={sucursal.id} key={sucursal.id}>{sucursal.distrito} ({sucursal.provincia})</Option>)
            }
          </Select>
        </Col>
        <Col span={9}>
          <p>
            <b>Seleccione destino final:</b>
          </p>
          <Select showSearch={true}
                  style={{ width: "100%" }}
                  onChange={value => setData({ ...globalData, destino: value })}
                  defaultValue={globalData.destino || "Destino"}>
            {
              sucursales.map(sucursal => <Option value={sucursal.id} key={sucursal.id}>{sucursal.distrito} ({sucursal.provincia})</Option>)
            }
          </Select>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
        <b>Seleccione el Tipo de Servicio que Desea:</b>
      </Row>
      <Row justify="space-around">
        <Button type="primary" disabled={globalData.origen === globalData.destino}>
          <Link to="/cliente/registro-paquete">Paqueteria</Link>
        </Button>
        <Button type="primary" disabled={globalData.origen === globalData.destino}>
          <Link to="/cliente/compra-pasaje">Pasaje</Link>
        </Button>
        <Button type="primary">
          <Link to="/cliente/seguimiento-paquete">Seguimiento</Link>
        </Button>
      </Row>
      <Row style={{ marginTop: 20 }} justify="space-around">
        <Col span="7">
          <img
            className="type-service__image"
            src={Paquete}
            alt="Boleto pasaje"
          />
        </Col>
        <Col span="7">
          <img className="type-service__image" src={Pasaje} alt="Paqueterias" />
        </Col>
        <Col span="7">
          <img
            className="type-service__image"
            src={Tracking}
            alt="Paqueterias"
          />
        </Col>
      </Row>
      {
        globalData.ticket &&
        <Modal visible={isModalVisible}
                closable={false}
                footer={[
                  <Button type="primary"
                          onClick={handleOk}>
                    Listo
                  </Button>,
                  <Button type="primary" onClick={handlePrint}>
                    <i className="fa fa-print" style={{ marginRight: 5 }} />
                    Imprimir Ticket
                  </Button>
                ]} 
                onCancel={handleCancel}>
          <ComponentToPrint ref={componentRef} data={{ globalData, sucursales }} />
        </Modal>
      }
    </DashboardClient>
  );
};

const ComponentToPrint = React.forwardRef((props, ref) => {
  const globalData = props.data.globalData;
  const sucursales = props.data.sucursales;
  return (
    <div ref={ref}>
      <h1 style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>Empresa de Transporte LOS MANANTIALES DEL SUL SRL</h1>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}><b>{`Resumen de Servicio N° ${globalData.ticket.numeroGuia}`}</b></h2>
      <Descriptions column={2} title="Datos de Origen y Destino">
        <Descriptions.Item label="Origen">
          {
            sucursales.map(sucursal => sucursal.id === globalData.ticket.origen && <span key={sucursal.id}>{sucursal.distrito} ({sucursal.provincia})</span>)
          }
        </Descriptions.Item>
        <Descriptions.Item label="Destino">
          {
            sucursales.map(sucursal => sucursal.id === globalData.ticket.destino && <span key={sucursal.id}>{sucursal.distrito} ({sucursal.provincia})</span>)
          }
        </Descriptions.Item>
      </Descriptions>
      {
        globalData.ticket.destinatario && <Descriptions column={2} title="Datos de Destinatario" style={{ width: "100%" }}>
          <Descriptions.Item label="Nombres">{globalData.ticket.destinatario.nombres}</Descriptions.Item>
          <Descriptions.Item label="DNI">{globalData.ticket.destinatario.dni}</Descriptions.Item>
          <Descriptions.Item label="Celular">{globalData.ticket.destinatario.celular}</Descriptions.Item>
        </Descriptions>
      }

      {
        globalData.ticket.remitente && <Descriptions column={2} title="Datos de Remitente" style={{ width: "100%" }}>
          <Descriptions.Item label="Nombres">{globalData.ticket.remitente.nombres}</Descriptions.Item>
          <Descriptions.Item label="Celular">{globalData.ticket.remitente.celular}</Descriptions.Item>
        </Descriptions>
      }

      {
        globalData.ticket.pasajero && <Descriptions column={2} title="Datos de Pasajero" style={{ width: "100%" }}>
          <Descriptions.Item label="Nombres">{globalData.ticket.pasajero.nombres}</Descriptions.Item>
          <Descriptions.Item label="Celular">{globalData.ticket.pasajero.celular}</Descriptions.Item>
        </Descriptions>
      }

      <Descriptions column={1} title="Datos de Servicio" style={{ width: "100%" }}>
        <Descriptions.Item label="Código usado">{globalData.ticket.codigo}</Descriptions.Item>
        {
          globalData.ticket.numeroSeguimiento && <Descriptions.Item label="Número de seguimiento">{globalData.ticket.numeroSeguimiento}</Descriptions.Item>
        }
        <Descriptions.Item label="Monto total">S/. {globalData.ticket.montoTotal}</Descriptions.Item>
        {
          globalData.ticket.numeroAsiento && <Descriptions.Item label="Número de asiento">{globalData.ticket.numeroAsiento}</Descriptions.Item>
        }
      </Descriptions>
      <p style={{ textAlign: "right", width: "100%" }}>{new Date(globalData.ticket.fecha).toLocaleString()}</p>
    </div>
  )
});

export default Dashboard;
