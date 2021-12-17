import React, { useState, useContext } from "react";
import { Input, Form, Button, Col, Row, message } from "antd";
import { Link } from "react-router-dom";

import DashboardClient from "../../Layout/DashboardClient";
import { Context } from "../../context";
import { signUp as signUpService } from '../../services/AuthServices';
import DashboardUser from "../../Layout/DashboardUser";
import { updateUser } from "../../services/UserServices";

const RenderDashboard = ({ children, rol, title, description }) => {
  if (rol !== 'cliente')
    return (
      <DashboardUser title={title} description={description}>
        {
          children
        }
      </DashboardUser>
    )
  return (
    <DashboardClient title={title} description={description}>
      {
        children
      }
    </DashboardClient>
  )
}

const Client = ({ history }) => {
  const { signUp, isAuth, setData, globalData } = useContext(Context);
  const [ state, setState ] = useState({
    data: {
      nombres: globalData.data.nombres || '',
      celular: globalData.data.celular || '',
      dni: globalData.data.dni || '',
      correo: globalData.data.correo || '',
      direccion: globalData.data.direccion,
      rol: 'cliente'
    },
    loading: false
  });

  const handleChange = e => {
    setState({
      data: {
        ...state.data,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleRegister = () => {
    fetchData(state.data);
  }

  const handleUpdate = () => {
    const data = {
      ...globalData.data,
      nombres: state.data.nombres,
      celular: state.data.celular,
      dni: state.data.dni,
      direccion: state.data.direccion,
      pass: !state.data.pass || state.data.pass.trim() === "" ? globalData.data.pass : state.data.pass
    };
    setState({ ...state, loading: true });
    updateUser(data).then(res => {
      if (res.statusCode === 200) {
        message.success(res.message);
        delete res.data.paquete;
        delete res.data.pasaje;
        setData({ ...globalData, data: res.data });
        console.log(res.data);
      }
      else if (res.statusCode === 400) message.warning(res.message);
      else message.warning(res.title);
      setState({ ...state, loading: false });
    }).catch(error => message.error(error.message));
  }

  const fetchData = clientData => {
    setState({ ...state, loading: true });
    signUpService(clientData).then(res => {
      if (res.statusCode === 201) {
        signUp(res.token.token);
        delete res.data.paquete;
        delete res.data.pasaje;
        setData({ ...globalData, data: res.data });
        history.push(`/${res.data.rol !== 'cliente' ? 'usuario' : 'cliente'}`);
      }
      else if (res.statusCode === 400) message.warning(res.message);
      else message.warning(res.title);
      setState({ ...state, loading: false });
    }).catch(error => message.error(error.message));
  }

  return (
    <RenderDashboard rol={globalData.data.rol} title={isAuth ? 'Actualizar' : 'Registro'} description={isAuth ? 'Actualice sus datos si desea.' : 'Es necesario que se registre para que pueda acceder a los servicios que tenemos para Ud.'}>
      <p style={{ color: "red" }}>Los campos (*) son obligatorios</p>
      <Form name="register-client"
            layout="vertical"
            onFinish={isAuth ? handleUpdate : handleRegister}
            autoComplete="off">
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Nombres" 
                        required
                        name={!isAuth ? "nombres" : undefined}
                        rules={[
                          {
                            required: true,
                            message: 'Los nombres son obligatorios'
                          }
                        ]}>
              <Input size="large" 
                      value={state.data.nombres} 
                      name="nombres" 
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="DNI" 
                        required
                        name={!isAuth ? "dni" : undefined}
                        rules={[
                          {
                            required: true,
                            message: 'El DNI es obligatorio'
                          },
                          {
                            len: 8,
                            message: 'El DNI debe tener 8 dígitos'
                          }
                        ]}>
              <Input size="large" 
                      value={state.data.dni} 
                      name="dni"
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Contraseña" 
                        required
                        name='pass'
                        rules={[
                          {
                            required: !globalData.data,
                            message: 'La contraseña es obligatoria'
                          },
                          {
                            min: 6,
                            message: 'Se acepta un mínimo de 6 caracteres'
                          }
                        ]}>
              <Input.Password size="large"
                      value={state.data.pass}
                      name="pass"
                      onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Celular"
                        required
                        name={!isAuth ? "celular" : undefined}
                        rules={[
                          {
                            required: true,
                            message: 'El celular es obligatorio'
                          },
                          {
                            len: 9,
                            message: 'El celular debe tener 9 dígitos'
                          }
                        ]}>
              <Input size="large" 
                      value={state.data.celular} 
                      name="celular"
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Correo electronico"
                        required
                        name={!isAuth ? "correo" : undefined}
                        rules={[
                          {
                            required: true,
                            message: 'El correo es obligatorio'
                          },
                          {
                            type: 'email',
                            message: 'Este correo no es válido'
                          }
                        ]}>
              <Input size="large"
                      value={state.data.correo}
                      name="correo"
                      disabled={isAuth}
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Domicilio" 
                        name={!isAuth ? "direccion" : undefined}>
              <Input size="large"
                      value={state.data.direccion}
                      name="direccion"
                      onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          Si ya te registraste con anterioridad <Link to="/ingresar" style={{ marginLeft: 5, marginBottom: 20 }}>ingresa aquí</Link>
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
                    loading={state.loading}
                    htmlType="submit">
              {isAuth ? 'Actualizar' : 'Registrar'}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </RenderDashboard>
  )
}

export default Client;
