import React, { useState, useContext } from "react";
import { Input, Form, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

import DashboardClient from "../Layout/DashboardClient";
import { Context } from "../context";
import { registerClient, signUpClient } from '../services/AuthServices';

const Client = ({ history }) => {
  //const servicio = new URLSearchParams(history.location.search).get('servicio');
  const { signUp, isAuth } = useContext(Context);
  const [ data, setData ] = useState({
    user: {
      nombres: '',
      celular: '',
      dni: '',
      correo: ''
    },
    loading: false
  });

  const handleChange = e => {
    setData({
      user: {
        ...data.user,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = () => {
    fetchData(data.user);
    // registerClient(data.user)
    //   .then(client => {
    //     if (client) {
          
    //     }
    //   });
  }

  const fetchData = clientData => {
    setData({ ...data, loading: true });
    signUpClient(clientData.correo, clientData.dni).then(res => {
      if (res.token) {
        signUp(res.token);
        setData({ ...data, loading: false });
      }
      else {
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <DashboardClient title={isAuth ? 'Actualizar' : 'Registro'} description={isAuth ? 'Actualice sus datos si desea.' : 'Es necesario que se registre para que pueda acceder a los servicios que tenemos para Ud.'}>
      <Form name="register-client"
              layout="vertical"
              onSubmitCapture={handleSubmit}
              autoComplete="off">
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Nombres" required>
              <Input size="large" 
                      value={data.user.nombres} 
                      name="nombres" 
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="DNI" required>
              <Input size="large" 
                      value={data.user.dni} 
                      name="dni"
                      onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Celular" required>
              <Input size="large" 
                      value={data.user.celular} 
                      name="celular" 
                      onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Correo electronico">
              <Input size="large"
                      value={data.user.correo}
                      name="correo" 
                      onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          Si ya te registraste con anterioridad <Link to="/cliente/ingresar" style={{marginLeft: 5, marginBottom: 20}}>ingresa aquí</Link>
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
                    style={{marginLeft: 10}}
                    type="primary"
                    loading={data.loading}
                    htmlType="submit">
              {isAuth ? 'Actualizar' : 'Registrar'}
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </DashboardClient>
  )
}

export default Client;