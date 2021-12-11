import React, { Component } from 'react'
import { message, Table, Button, Row, Modal, Form, Input, Popconfirm } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { getTrackings, updateTracking, createStatusTracking } from '../../services/TrackingServices';
import formatDateToDatetime from '../../utils/formatDateToDatetime';

class UpdateStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: false,
      loadingTable: true,
      loadingSubmit: false,
      inputValue: "",
      uuidTracking: ""
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
      const response = await getTrackings();
      const dataFormat = response.map((user, i) => {
        return {
          ...user, 
          fechaEnvioFormat: new Date(user.fechEnvio).toLocaleString(),
          key: i,
          uuid: user.fechaEntrega ? null : user.uuid
        };
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

    const handleFinished = (uuid) => {
      const tracking = this.state.data.find(x => x.uuid === uuid);
      tracking.fechaEntrega = formatDateToDatetime(new Date());
      updateTracking(tracking).then(res => {
        if (res.statusCode === 200) message.success(res.message);
        else if (res.statusCode === 401) message.warning(res.message);
        else message.warning(res.title);
      }).catch(error => message.error(error.message));
    }

    const handleUpdate = (uuid) => this.setState({ isModalVisible: true, uuidTracking: uuid });

    const handleCancel = () => this.setState({ isModalVisible: false, inputValue: "" });

    const handleSubmit = () => {
      this.setState({ loadingSubmit: true });
      const data = {
        descripcion: this.state.inputValue,
        seguimiento: this.state.uuidTracking,
        fecha: formatDateToDatetime(new Date())
      }
      createStatusTracking(data).then(res => {
        if (res.statusCode === 200) message.success(res.message);
        else if (res.statusCode === 401) message.warning (res.message);
        else message.warning(res.title);
        handleCancel();
        this.setState({ loadingSubmit: false });
      }).catch(error => message.error(error.message));
    }

    const handleChange = e => this.setState({ inputValue: e.target.value });

    const columns = [
      {
        title: 'Seguimiento',
        dataIndex: 'numeroSeguimiento',
      },
      {
        title: 'Fecha Envio',
        dataIndex: 'fechaEnvioFormat'
      },
      {
        title: 'Estado',
        dataIndex: 'fechaEntrega',
        align: 'center',
        render: x => (
          <span style={{ color: x ? 'lime' : 'red' }}>{x ? 'Finalizado' : 'En transito'}</span>
        )
      },
      {
        title: 'Acciones',
        dataIndex: 'uuid',
        align: 'center',
        render: uuid => uuid ? <>
          <Popconfirm title="¿Está seguro que quiere finalizar el seguimiento?"
                      onConfirm={() => handleFinished(uuid)} 
                      cancelText="Cancelar" 
                      okText="Finalizar">
            <a title="Finalizar seguimiento"
              style={{ marginRight: 10, color: "lime" }}>
              <i className="fa fa-check" />
            </a>
          </Popconfirm>
          <a title="Actualizar Estado"
            onClick={() => handleUpdate(uuid)}>
            <i className="fa fa-edit" />
          </a>
        </> : <span>-</span>
      }
    ];

    return (
      <DashboardUser title="Actualización de estados de paquetes">
        <Table size="small"
                columns={columns}
                scroll={{ y: 250 }}
                loading={this.state.loadingTable}
                dataSource={this.state.data} />

        <Modal title="Actualizar estado"
                visible={this.state.isModalVisible}
                onCancel={handleCancel}
                footer={false}
                centered>
          <Form onSubmitCapture={handleSubmit}>
            <Row justify="space-around">
              <Form.Item>
                <Input onChange={handleChange}
                        placeholder="Descripción" 
                        value={this.state.inputValue} />
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                        htmlType="submit"
                        loading={this.state.loadingSubmit}>
                  Actualizar
                </Button>
              </Form.Item>
            </Row>
          </Form>
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
      </DashboardUser>
    )
  }
}

export default UpdateStatus;