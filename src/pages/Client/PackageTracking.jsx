import React from "react";
import { Table, Button, Row, Modal } from 'antd';

import DashboardClient from "../../Layout/DashboardClient";
import { getPackagesByClient, getTracking } from '../../services/TrackingServices';
import { Context } from '../../context';
import TimelineStatus from "../../components/Client/TimelineStatus";

class PackageTracking extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: false,
      dataTracking: {
        title: ''
      }
    }
  }

  componentDidMount() {
    this.fetchData(this.context.globalData.data.uuid).then(res => {
      const dataFormat = res.map((paquete, i) => {
        return { ...paquete, createdAt: new Date(paquete.createdAt).toLocaleString(), key: i };
      });
      this.setState({
        data: dataFormat
      })
    })
  }

  async fetchData (uuid) {
    const packages = await getPackagesByClient(uuid);
    return packages
  }

  render() {
    const handleVisible = (estado) => {
      getTracking(estado).then(data => {
        this.setState({
          isModalVisible: true,
          dataTracking: {
            ...data,
            title: "Estado del paquete"
          }
        });
      })
    }

    const handleCancel = () => {
      this.setState({
        isModalVisible: false
      })
    }

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
        dataIndex: 'seguimiento',
        width: 40,
        render: estado => 
        <a title="Ver los estados" onClick={() => handleVisible(estado)}>
          <i className="fa fa-truck" />
        </a>
      }
    ];

    return (
      <DashboardClient title="Seguimiento de Paquetes">
        <Table size="small"
                columns={columns}
                scroll={{ y: 320 }}
                dataSource={this.state.data} />

        <Modal title={this.state.dataTracking.title}
                visible={this.state.isModalVisible}
                onCancel={handleCancel}
                footer={false}
                closable={false}
                centered>
          <p><b>Numero de Seguimiento: {this.state.dataTracking.numeroSeguimiento}</b></p> <br />
          {
            <TimelineStatus status={this.state.dataTracking.estadoSeguimiento} />
          }
        </Modal>

        <Row justify="center" style={{ marginTop: 10 }}>
          <Button size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => this.props.history.goBack()}
                  danger>
            Atrás
          </Button>
        </Row>
      </DashboardClient>
    )
  }
}

export default PackageTracking;
