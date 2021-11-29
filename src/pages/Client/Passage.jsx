import React from "react";
import { Button, Row, Form } from "antd";

import DashboardClient from "../../Layout/DashboardClient";
import ContainerVans from '../../components/Client/ContainerVans';
import { getTravelPrice } from "../../services/Services";
import { getVehicules } from "../../services/VehiculeServices";
import context, { Context } from "../../context";

class Passage extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      vehicules: [],
      total: 0
    }
  }

  componentDidMount() {
    const { globalData } = this.context;
    this.fetchPrice(globalData);
    this.fetchVehicules(globalData);
  }

  fetchPrice(globalData) {
    getTravelPrice().then(data => {
      data = data.filter(price => price.origenSucursal === globalData.origen && price.destinoSucursal === globalData.destino);

      if (data[0]){
        this.context.setData({
          ...globalData,
          total: data[0].precioPasaje
        });
        this.setState({
          ...this.state,
          total: data[0].precioPasaje
        });
      } else {
        this.context.setData({
          ...globalData,
          total: 0.0
        });
        this.setState({
          ...this.state,
          total: 0.0
        });
      } 
    });
  }

  fetchVehicules(globalData) {
    getVehicules(globalData.origen, globalData.destino).then(data => {
      this.setState({
        vehicules: data
      });
    })
  }

  render() {
    const { globalData } = this.context;
    return (
      <DashboardClient title="Compra de pasajes" description="Seleccione el horario y asiento que desea comprar">
        <Row>
          <ContainerVans total={this.state.total} vehicules={this.state.vehicules} />
        </Row>
        <Row style={{ marginBottom: 20 }}>
          Total a pagar es <strong style={{marginLeft: 5}}>S/. {globalData.total}</strong>
        </Row>
        <Row justify="center">
          <Form.Item>
            <Button size="large"
                    type="primary"
                    htmlType="button"
                    onClick={() => this.props.history.goBack()}
                    danger>
              Atrás
            </Button>
          </Form.Item>
          <Form.Item>
            <Button size="large"
                    style={{ marginLeft: 10 }}
                    type="primary"
                    htmlType="submit">
              Continuar
            </Button>
          </Form.Item>
        </Row>
      </DashboardClient>
    )
  }
}

export default Passage;
