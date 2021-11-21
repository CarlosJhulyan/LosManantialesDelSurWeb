import React from "react";
import { Button, Row, Col, Form } from "antd";

import DashboardClient from "../Layout/DashboardClient";

const Passage = ({ history }) => {
  const goBack = () => {
		history.goBack();
	}

  return (
    <DashboardClient title="Compra de pasajes" description="Seleccione el horario y asiento que desea comprar">
      <Row style={{marginBottom: 20}}>
        Total a pagar de Huamanga a Huanta es: S/15.00
      </Row>
      <Row justify="center">
        <Form.Item>
          <Button size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => goBack()}
                  danger>
            Atrás
          </Button>
        </Form.Item>
        <Form.Item>
          <Button size="large"
                  style={{marginLeft: 10}}
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
