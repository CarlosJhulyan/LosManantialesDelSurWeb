import React, { useState } from "react";
import { Table, Button, Row } from 'antd';

import DashboardClient from "../Layout/DashboardClient";

const PackageTracking = ({ history }) => {
  const [ state, setState ] = useState({
    searchText: '',
    searchedColumn: ''
  });

  const columns = [
    {
      title: 'Nro. de Guía',
      dataIndex: 'numeroGuia',
      width: 130
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion'
    },
    {
      title: 'Fecha',
      dataIndex: 'createdAt',
      width: 180
    },
    {
      title: 'Ac.',
      dataIndex: 'numeroGuia',
      width: 40,
      render: (x) => <a href={x}><i className="fa fa-truck" /></a>
    }
  ]

  const data = [
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    },
    {
      "numeroGuia": "0052-009",
      "descripcion": "Paquete negro contenido fragil",
      "createdAt": "2021-11-19T15:34:11.723",
    }
  ];

  return (
    <DashboardClient title="Seguimiento de Paquetes">
      <Table size="small"
              columns={columns}
              scroll={{ y: 320 }}
              dataSource={data} />

      <Row justify="center">
        <Button size="large"
                type="primary"
                htmlType="button"
                onClick={() => history.goBack()}
                danger>
          Atrás
        </Button>
      </Row>
    </DashboardClient>
  )
}

export default PackageTracking;
