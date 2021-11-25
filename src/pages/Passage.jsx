import React from "react";
import { Button, Row, Form } from "antd";

import DashboardClient from "../Layout/DashboardClient";
import Van from '../components/Client/ContainerVans';

const Passage = ({ history }) => {
  return (
    <DashboardClient title="Compra de pasajes" description="Seleccione el horario y asiento que desea comprar">
      <Row>
        <Van />
      </Row>
      <Row style={{ marginBottom: 20 }}>
        Total a pagar de Huamanga a Huanta es: S/15.00
      </Row>
      <Row justify="center">
        <Form.Item>
          <Button size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => history.goBack()}
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

export default Passage;
