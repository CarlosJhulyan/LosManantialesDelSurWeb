import React, { Component } from 'react'
import { Row, Button, Form, Input, Col, message, Spin } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { getPricesPercent, updatePricePercent } from '../../services/Services';

class PricesPercent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await getPricesPercent();
      this.setState({ data: response, loading: false });
      response.map(tarifa => this.setState({ [`asiento${tarifa.numeroAsiento}`]: tarifa.porcentajeVariacion, [`loadingSubmit${tarifa.numeroAsiento}`]: false }));
    } catch (error) {
      message.error(error.message);
    }
  }

  render() {
    const handleChange = e => {
      this.setState({ [e.target.name]: Number(e.target.value) });
    }

    const handleSubmit = (e, price) => {
      const porcentajeVariacion = this.state[e.target.id];
      if(porcentajeVariacion <= 0 || porcentajeVariacion === null) {
        message.warning("El porcentaje del asiento #" + price.numeroAsiento + " es invalido");
        return;
      }
      const data = {
        ...price,
        porcentajeVariacion
      }
      this.setState({ [`loadingSubmit${price.numeroAsiento}`]: true });
      updatePricePercent(data).then(res => {
        if (res.statusCode === 200) message.success(res.message);
        else if (res.statusCode === 401) message.warning(res.message);
        else message.warning(res.title);
        this.setState({ [`loadingSubmit${price.numeroAsiento}`]: false });
      }).catch(error => message.error(error.message));
    }

    return (
      <DashboardUser title="Tarifa de asientos (%)">
        {
          !this.state.loading ? 

          <Row justify="space-around">
            {
              this.state.data.map((price, i) =>
                <Col span={11} key={i}>
                  <Form onSubmitCapture={e => handleSubmit(e, price)} name={`asiento${i+1}`}>
                    <Row justify="space-around">
                      <Form.Item label={`# ${price.numeroAsiento}`}>
                        <Input type="number" 
                                size="small"
                                min="0"
                                onChange={handleChange}
                                name={`asiento${i+1}`}
                                value={this.state[`asiento${i+1}`]}
                                placeholder="%" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary"
                                loading={this.state[`loadingSubmit${price.numeroAsiento}`]}
                                htmlType="submit">
                          <i className="fa fa-arrow-circle-up" />
                        </Button>
                      </Form.Item>
                    </Row>
                  </Form>
                </Col>)
            }
          </Row> : <Spin />
        }
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

export default PricesPercent;