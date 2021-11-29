import React, { Component } from 'react'
import { Button, Row, Table, message } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { getClients, deleteClient } from '../../services/ClientServices';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.fetchData().then(res => {
      const dataFormat = res.map((client, i) => {
        return { ...client, i: i + 1, key: i };
      });
      this.setState({
        data: dataFormat
      });
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    this.fetchData().then(res => {
      const dataFormat = res.map((client, i) => {
        return { ...client, i: i + 1, key: i };
      });
      this.setState({
        data: dataFormat
      });
    });
  }

  async fetchData () {
    const clients = await getClients();
    return clients;
  }

  render() {

    const handleDelete = (uuid) => {
      deleteClient(uuid).then(res => message.success(res.message)).catch(err => message.error("Error 500 en los servidores: " + err.message));
    }

    const columns = [
      {
        title: 'Nro.',
        dataIndex: 'i',
        width: 50
      },
      {
        title: 'Nombres y Apellidos',
        dataIndex: 'nombres',
        width: 200
      },
      {
        title: 'Correo',
        dataIndex: 'correo',
        width: 200
      },
      {
        title: 'Celular',
        dataIndex: 'celular',
      },
      {
        title: 'Acciones',
        dataIndex: 'uuid',
        width: 80,
        align: "center",
        render: uuid => (
          <a title="Ver los estados" 
              style={{ color: "red" }} 
              onClick={() => handleDelete(uuid)}>
            <i className="fa fa-trash" />
          </a>
        )
      }
    ];

    return (
      <DashboardUser title="Lista de Clientes">
        <Table size="small"
                columns={columns}
                scroll={{ y: 320 }}
                dataSource={this.state.data} />
        <Row justify="center" style={{ marginTop: 10 }}>
          <Button size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => this.props.history.goBack()}
                  danger>
            Atrás
          </Button>
        </Row>
      </DashboardUser>
    )
  }
}

export default Clients;