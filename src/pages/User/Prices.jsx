import React, { Component } from 'react'
import { Row, Button, Table, Input, Col, message, Form } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { getTravelPrice, getSucursal, updateTravelPrice } from '../../services/Services';

class Prices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingTable: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await getTravelPrice();
      const sucursales = await getSucursal();
      const dataFormat = response.map((price, i) => {
        const destino = sucursales.find(sucursal => sucursal.id === price.destinoSucursal);
        const origen = sucursales.find(sucursal => sucursal.id === price.origenSucursal);

        return { ...price, key: i, destinoSucursal: destino.distrito, origenSucursal: origen.distrito  }
      });

      response.map(x => {
        this.setState({
          [`paquete${x.id}`]: x.precioPaquete,
          [`pasaje${x.id}`]: x.precioPasaje
        });
      });

      this.setState({
        data: dataFormat,
        dataOriginal: response,
        loadingTable: false
      });
    } catch (error) {
      message.error(error.message);
    }
  }

  render() {

    const handleSubmit = (e, id) => {
      const data = this.state.dataOriginal.find(x => x.id === id);
      if (e.target.id === `paquete${id}`) data.precioPaquete = this.state[e.target.id];
      if (e.target.id === `pasaje${id}`) data.precioPasaje = this.state[e.target.id];
      updateTravelPrice(data).then(res=> {
        if (!res.title) message.success(res.message);
        else message.warning(res.title);
      }).catch(error => {
        message.error(error.message);
      });
    }
    
    const handleChange = e => this.setState({ [e.target.name]: Number(e.target.value) });

    const colum1 = [
      {
        title: 'Origen',
        dataIndex: 'origenSucursal'
      },
      {
        title: 'Destino',
        dataIndex: 'destinoSucursal'
      },
      {
        title: 'Precio (S/.)',
        dataIndex: 'id',
        render: id => 
        <Form name={`pasaje${id}`} onSubmitCapture={e => handleSubmit(e, id)}>
          <Row justify="space-between">
            <Col span={15}>
              <Input type="number"
                    size="small"
                    value={this.state[`pasaje${id}`]}
                    name={`pasaje${id}`}
                    onChange={handleChange} />
            </Col>
            <Col>
              <Button type="primary" 
                      htmlType="submit"
                      size="small">
                <i className="fa fa-arrow-up" />
              </Button>
            </Col>
          </Row>
        </Form>
      }
    ];

    const colum2 = [
      {
        title: 'Origen',
        dataIndex: 'origenSucursal'
      },
      {
        title: 'Destino',
        dataIndex: 'destinoSucursal'
      },
      {
        title: 'Precio (S/.)',
        dataIndex: 'id',
        render: id => 
        <Form name={`paquete${id}`} onSubmitCapture={e => handleSubmit(e, id)}>
          <Row justify="space-between">
            <Col span={15}>
              <Input type="number"
                    size="small"
                    min="0"
                    value={this.state[`paquete${id}`]}
                    name={`paquete${id}`}
                    onChange={handleChange} />
            </Col>
            <Col>
              <Button type="primary" 
                      htmlType="submit"
                      size="small">
                <i className="fa fa-arrow-up" />
              </Button>
            </Col>
          </Row>
        </Form>
      }
    ];

    return (
      <DashboardUser title="Actualizar precios">
        <Row justify="space-around" style={{ marginBottom: 10 }}>
          <Col span={11} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Actualizar Pasajes
          </Col>
          <Col span={11} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Actualizar Paquetes
          </Col>
        </Row>
        <Row justify="space-around">

          <Col span={11}>
            <Table columns={colum1}
                  dataSource={this.state.data} 
                  size="small"
                  loading={this.state.loadingTable} />
          </Col>

          <Col span={11}>
            <Table columns={colum2}
                  dataSource={this.state.data}
                  size="small"
                  loading={this.state.loadingTable} />
          </Col>

        </Row>
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

export default Prices;