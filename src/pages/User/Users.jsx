import React, { Component } from 'react'
import { Button, Row, Table, message, Popconfirm } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { getAdmins, deleteUser } from '../../services/UserServices';

class Users extends Component {
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
      const response = await getAdmins();
      const dataFormat = response.map((user, i) => {
        return { ...user, i: i + 1, key: i };
      });
      this.setState({
        data: dataFormat,
        loadingTable: false
      });
    } catch (error) {
      message.error(error.message);
    }
  }

  render() {

    const handleDelete = (uuid) => {
      this.setState({ loadingTable: true });
      deleteUser(uuid).then(res => {
        if (res.message) message.success(res.message);
        else message.warning(res.title);
        this.setState({ loadingTable: false });
      }).catch(error => message.error(error.message));
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
        width: 160
      },
      {
        title: 'Correo',
        dataIndex: 'correo',
        width: 160
      },
      {
        title: 'DNI',
        dataIndex: 'dni'
      },
      {
        title: 'Rol',
        dataIndex: 'rol',
      },
      {
        title: 'Acciones',
        dataIndex: 'uuid',
        width: 80,
        align: "center",
        render: uuid => 
        <Popconfirm title="¿Está seguro de liminar este usuario?"
                    onConfirm={() => handleDelete(uuid)}
                    cancelText="Cancelar"
                    okText="Finalizar">
          <a title="Ver los estados"
            style={{ color: "red" }}>
            <i className="fa fa-trash" />
          </a>
        </Popconfirm>
      }
    ];

    return (
      <DashboardUser title="Lista de Usuarios">
        <Table size="small"
                columns={columns}
                scroll={{ y: 300 }}
                loading={this.state.loadingTable}
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

export default Users;