import React, { useState, useContext } from "react";
import { Input, Form, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

import DashboardClient from "../Layout/DashboardClient";
import { Context } from "../context";

const Register = ({ history }) => {
  const servicio = new URLSearchParams(history.location.search).get('servicio');
  const { signUp } = useContext(Context);
  const goBack = () => {
    history.goBack();
  };
  const [ data, setData ] = useState({
    user: {
      nombres: '',
      telefono: '',
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
    setData({
      ...data,
      loading: true
    });
    setTimeout(() => {
      setData({
        ...data,
        loading: false
      });
      history.push(`/cliente/${servicio}`);
      signUp('token');
    }, 3000);
  }

  return (
    <DashboardClient title="Registro" description="Es necesario que se registre para que pueda acceder a los servicios que tenemos para Ud.">
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
            <Form.Item label="Telefono" required>
              <Input size="large" 
                      value={data.user.telefono} 
                      name="telefono" 
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
                    onClick={() => goBack()}
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
              Registrar
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </DashboardClient>
  )
}

export default Register;