import React from "react";
import { Form, Input, Col, Row, Button } from 'antd';

import DashboardClient from "../Layout/DashboardClient";

const RegisterPackage = ({ history }) => {
	const goBack = () => {
		history.goBack();
	}

	return (
		<DashboardClient title="Registro de paquete" description="Todos los campos (*) son obligatorios:">
			<Form name="register-package" 
							layout="vertical" 
							autoComplete="off">
				<Row>
					<b>Datos Destinatario:</b>
				</Row>
				<Row justify="space-between">
					<Col span={11}>
						<Form.Item label="Nombres" required>
							<Input size="large" />
						</Form.Item>
						<Form.Item label="Celular">
							<Input size="large" />
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item label="DNI" required>
							<Input size="large" />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<b>Datos del paquete:</b>
				</Row>
				<Row justify="space-between">
					<Col span={11}>
						<Form.Item label="Dimensiones" required>
							<Row justify="space-between" align="stretch">
								<Col span={4}>
									<Form.Item>
										<Input />
									</Form.Item>
								</Col>x
								<Col span={4}>
									<Form.Item>
										<Input />
									</Form.Item>
								</Col>x
								<Col span={4}>
									<Form.Item>
										<Input />
									</Form.Item>
								</Col>
								<Col span={4}>cm</Col>
							</Row>
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item label="Descripción">
							<Input.TextArea />
						</Form.Item>
					</Col>
				</Row>
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
			</Form>
		</DashboardClient>
	)
} 
export default RegisterPackage;
