import React, { useState, useContext } from "react";
import { Input, Form, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

import DashboardClient from "../../Layout/DashboardClient";
import { Context } from "../../context";
import { registerClient, signIn } from '../../services/AuthServices';
import DashboardUser from "../../Layout/DashboardUser";

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
      pass: '',
      direccion: globalData.data.direccion
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
    console.log('Encargado de actualizar');
  }

  const fetchData = clientData => {
    setState({ ...state, loading: true });
    signIn(clientData.correo, clientData.dni).then(res => {
      if (res.token) {
        signUp(res.token);
        setState({ ...state, loading: false });
      }
      else {
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <RenderDashboard rol={globalData.data.rol} title={isAuth ? 'Actualizar' : 'Registro'} description={isAuth ? 'Actualice sus datos si desea.' : 'Es necesario que se registre para que pueda acceder a los servicios que tenemos para Ud.'}>
      <Form name="register-client"
              layout="vertical"
              onSubmitCapture={isAuth ? handleUpdate : handleRegister}
              autoComplete="off">
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Nombres" required>
              <Input size="large" 
                      value={state.data.nombres} 
                      name="nombres" 
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="DNI" required>
              <Input size="large" 
                      value={state.data.dni} 
                      name="dni"
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Contraseña">
              <Input size="large"
                      value={state.data.pass}
                      name="pass"
                      onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Celular">
              <Input size="large" 
                      value={state.data.celular} 
                      name="celular" 
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Correo electronico">
              <Input size="large"
                      value={state.data.correo}
                      name="correo"
                      disabled={isAuth}
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Domicilio">
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
