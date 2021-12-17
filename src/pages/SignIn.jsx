import React, { useState, useContext } from "react";
import { Form, Input, Button, Row, Col, message } from 'antd';
import { Link } from "react-router-dom";

import DashboardClient from "../Layout/DashboardClient";
import { signIn as signInService } from "../services/AuthServices";
import { Context } from "../context";

const SignUpClient = ({ history }) => {
  const { signIn, setData, globalData } = useContext(Context);
  const [ state, setState ] = useState({
    data: {
      password: '',
      correo: ''
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

  const handleSubmit = () => {
    fetchData(state.data);
  }

  const fetchData = data => {
    setState({ ...state, loading: true });
    signInService(data).then(res => {
      if (res.statusCode === 200){
        signIn(res.token.token);
        delete res.data.paquete;
        delete res.data.pasaje;
        setData({ ...globalData, data: res.data });
        history.push(`/${res.data.rol !== 'cliente' ? 'usuario' : 'cliente'}`);
      }
      else message.warning(res.value.message);
      setState({ ...state, loading: false });
    }).catch(() => {
      message.error("Error 500: Fallo en los servidores");
    });
  }
  
  return (
    <DashboardClient title="Ingresar">
      <Form name="register-client"
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off">
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Correo electronico" 
                        name="correo"
                        rules={[
                          {
                            type: 'email',
                            message: 'Este correo no es valido'
                          },
                          {
                            required: true,
                            message: 'Ingrese su correo electrónico'
                          }
                        ]}>
              <Input size="large"
                      value={state.data.correo}
                      name="correo"
                      onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Contraseña"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Ingrese su contraseña'
                          }
                        ]}>
              <Input.Password size="large" 
                              value={state.data.password} 
                              name="password"
                              onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          Si aun no estás registrado <Link to="/registro" style={{ marginLeft: 5, marginBottom: 20 }}>registrate aquí</Link>
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
              Ingresar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </DashboardClient>
  )
}

export default SignUpClient;