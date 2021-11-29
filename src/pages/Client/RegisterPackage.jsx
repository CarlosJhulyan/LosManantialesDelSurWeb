
import React from "react";
import { Form, Input, Col, Row, Button } from 'antd';

import DashboardClient from "../../Layout/DashboardClient";
import { Context } from "../../context";
import { getTravelPrice } from '../../services/Services';


class RegisterPackage extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { globalData } = this.context;
		getTravelPrice().then(data => {
			data = data.filter(price => price.origenSucursal === globalData.origen && price.destinoSucursal === globalData.destino);

			if (data[0])
				this.context.setData({
					...globalData,
					total: data[0].precioPaquete
				})
			else
				this.context.setData({
					...globalData,
					total: 0.0
				})
		});
	}

	render() {
		const { globalData } = this.context;
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
											<Input placeholder="12" />
										</Form.Item>
									</Col>x
									<Col span={4}>
										<Form.Item>
											<Input placeholder="45" />
										</Form.Item>
									</Col>x
									<Col span={4}>
										<Form.Item>
											<Input placeholder="60" />
										</Form.Item>
									</Col>
									<Col span={4}>cm</Col>
								</Row>
							</Form.Item>
						</Col>
						<Col span={11}>
							<Form.Item label="Descripción" required>
								<Input.TextArea placeholder="Ejemplo: Paquete rectangular color negro contenido FRAGIL" />
							</Form.Item>
						</Col>
					</Row>
					<Row style={{ marginBottom: 20 }}>
						Total a pagar desde {globalData.origen} hasta {globalData.destino} es <strong style={{marginLeft: 5}}>S/. {globalData.total}</strong>
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
								Contitnuar
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</DashboardClient>
		)
	}
} 
export default RegisterPackage;
