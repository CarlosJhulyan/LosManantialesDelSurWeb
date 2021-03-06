import React, { Component } from 'react'
import { Button, Row, Table, message, Popconfirm } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { getClients, deleteUser } from '../../services/UserServices';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingTable: true
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data === this.state.data) {
      this.fetchData();
    }
  }

  async fetchData () {
    try {
      const response = await getClients();
      const dataFormat = response.map((client, i) => {
        return { ...client, i: i + 1, key: i };
      });
      this.setState({
        data: dataFormat,
        loadingTable: false
      });
    } catch (error) {
      message.error(error.message)
    }
  }

  render() {
    const handleDelete = (uuid) => {
      this.setState({ loadingTable: true });
      deleteUser(uuid).then(res => {
        if(res.message) message.success(res.message);
        else message.warning(res.title);
        this.setState({ loadingTable: false });
      }).catch(err => message.error(err.message));
    }

    const columns = [
      {
        title: 'Nro.',
        dataIndex: 'i',
        width: 50
      },
      {
        title: 'Nombres',
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
          <Popconfirm title="¿Está seguro de liminar este usuario?"
                      onConfirm={() => handleDelete(uuid)}
                      cancelText="Cancelar"
                      okText="Finalizar">
            <a title="Ver los estados"
                style={{ color: "red" }}>
              <i className="fa fa-trash" />
            </a>
          </Popconfirm>
        )
      }
    ];

    return (
      <DashboardUser title="Lista de Clientes">
        <Table size="small"
                loading={this.state.loadingTable}
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