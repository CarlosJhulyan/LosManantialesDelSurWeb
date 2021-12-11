
import React from "react";
import { Form, Input, Col, Row, Button, message, Empty } from 'antd';

import DashboardClient from "../../Layout/DashboardClient";
import { Context } from "../../context";
import { getTravelPrice } from '../../services/Services';
import { getVehicules } from "../../services/VehiculeServices";

class RegisterPackage extends React.Component {
	static contextType = Context;

	constructor(props) {
		super(props);
		this.state = {
			nombres: "",
			dni: "",
			celular: "",
			dimensionX: "",
			dimensionY: "",
			dimensionZ: "",
			descripcion: "",
			vehicules: []
		}
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
		this.fetchVehicules(globalData);
	}

	fetchVehicules(globalData) {
    getVehicules(globalData.origen, globalData.destino).then(data => {
      this.setState({
        vehicules: data
      });
    })
  }

	render() {
		const { globalData, setData } = this.context;

		const handleChange = e => this.setState({ [e.target.name]: e.target.value });

		const handleSubmit = () => {
			const paquete = {
				dimensiones: `${this.state.dimensionX}x${this.state.dimensionY}x${this.state.dimensionZ}`,
				descripcion: this.state.descripcion,
			}
			const destinatario = {
				nombres: this.state.nombres,
				celular: this.state.celular,
				dni: this.state.dni
			}

			if (paquete.dimensiones === "" || paquete.descripcion === "" || destinatario.nombres === "" || destinatario.dni === "") {
				message.warning("Algunos campos obligatorios estan vacios");
				return;
			} else if (this.state.dimensionX <= 0 || this.state.dimensionY <= 0 || this.state.dimensionZ <= 0) {
				message.warning("El campo de dimensiones es invalido");
				return;
			}

			setData({
				...globalData,
				paquete,
				destinatario,
				pasaje: null
			});
			this.props.history.push("/cliente/registro-pago");
		}

		return (
			<DashboardClient title="Registro de paquete" description="Todos los campos (*) son obligatorios:">
				<Form name="register-package"
								layout="vertical"
								onSubmitCapture={handleSubmit}
								autoComplete="off">
					{
						this.state.vehicules.length > 0 ?
						<>
							<Row>
								<b>Datos Destinatario:</b>
							</Row>
							<Row justify="space-between">
								<Col span={11}>
									<Form.Item label="Nombres" required>
										<Input size="large" 
														value={this.state.nombres} 
														name="nombres"
														onChange={handleChange} />
									</Form.Item>
									<Form.Item label="Celular">
										<Input size="large" 
														value={this.state.celular}
														name="celular"
														onChange={handleChange} />
									</Form.Item>
								</Col>
								<Col span={11}>
									<Form.Item label="DNI" required>
										<Input size="large" 
														value={this.state.dni} 
														name="dni"
														onChange={handleChange} />
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
											<Col span={5}>
												<Form.Item>
													<Input name="dimensionX" 
																	value={this.state.dimensionX} 
																	type="number"
																	placeholder="12" 
																	min="0"
																	onChange={handleChange} />
												</Form.Item>
											</Col>x
											<Col span={5}>
												<Form.Item>
													<Input name="dimensionY" 
																	value={this.state.dimensionY} 
																	type="number"
																	placeholder="45" 
																	min="0"
																	onChange={handleChange} />
												</Form.Item>
											</Col>x
											<Col span={5}>
												<Form.Item>
													<Input name="dimensionZ"
																	value={this.state.dimensionZ}
																	type="number"
																	placeholder="60"
																	min="0"
																	onChange={handleChange} />
												</Form.Item>
											</Col>
											<Col span={4}>cm</Col>
										</Row>
									</Form.Item>
								</Col>
								<Col span={11}>
									<Form.Item label="Descripción" required>
										<Input.TextArea value={this.state.descripcion} 
																		name="descripcion" 
																		placeholder="Ejemplo: Paquete rectangular color negro contenido FRAGIL" 
																		onChange={handleChange} />
									</Form.Item>
								</Col>
							</Row>
						</> : 
						<Empty style={{ margin: "0 auto" }} description="No hay vehiculos ahora" />
					}
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
						{
							this.state.vehicules.length > 0 &&
							<Form.Item>
								<Button size="large"
												style={{ marginLeft: 10 }}
												type="primary"
												htmlType="submit">
									Continuar
								</Button>
							</Form.Item>
						}
					</Row>
				</Form>
			</DashboardClient>
		)
	}
} 
export default RegisterPackage;
