import React, { useContext } from "react";
import { Input, Form, Row, Button } from 'antd'

import DashboardClient from "../../Layout/DashboardClient";
import PaymentMethod from "../../components/Client/PaymentMethod";
import { Context } from "../../context";

import Yape from '../../images/yape.png';
import Lukita from '../../images/lukita.jpg';
import Bim from '../../images/bim.png';
import Tunki from '../../images/tunki.jpg';
import Bbva from '../../images/bbva.jpg';
import Bcp from '../../images/bcp.jpg';
import Interbank from '../../images/interbank.png';
import Scotiabank from '../../images/scotiabank.png';

const RegisterPayment = ({ history }) => {
  const { globalData } = useContext(Context);

  return (
    <DashboardClient title="PAGO" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sunt, ea tempore ratione quod voluptates quibusdam quidem non veniam debitis itaque molestias illo nulla impedit voluptatibus accusamus, nam similique facere.
    Necessitatibus exercitationem nihil ea voluptatem esse nobis recusandae alias! Totam architecto fugit incidunt iusto. Modi pariatur consequatur dolor officiis aperiam commodi architecto assumenda nihil, nobis quia.">
      <Row>
        <PaymentMethod images={[ Yape, Lukita, Bim, Tunki ]} numbers={[ 'Tunki: 935990471', 'Lukita: 935990471', 'Bim: 935990471', 'Tunki: 935990471' ]} />
        <PaymentMethod images={[ Bcp, Bbva, Scotiabank, Interbank ]} numbers={[ 'BCP: 193-1121663-0-28', 'Bbva: 0011-0814-0207578008-16', 'Scotiabank: 009-8894052', 'Interbank: 200-3079473367' ]} />
      </Row>
      <Row style={{ marginTop: 10 }}>
        Total a pagar de {globalData.origen} a {globalData.destino} es: S/ {globalData.total}
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <small>
          <b>Nota:</b> para obtener su código de validación de su pago, enviar el vaucher al número en WhatsApp (+51) 935990471
        </small>
      </Row>
      <Form>
        <Row justify="center">
          <Form.Item label="Código de Validación">
            <Input placeholder="Ejemplo: B7Y3D0" />
          </Form.Item>
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
              Confirmar
            </Button>
          </Form.Item>
				</Row>
      </Form>
    </DashboardClient>
  )
}

export default RegisterPayment;
