import React, { useState, useContext } from "react";
import { Form, Input, Button, Row, Col, message } from 'antd';
import { Link } from "react-router-dom";

import DashboardClient from "../../Layout/DashboardClient";
import { signInClient } from "../../services/AuthServices";
import { Context } from "../../context";

const SignUpClient = ({ history }) => {
  const { signUp, setData, globalData } = useContext(Context);
  const [ state, setState ] = useState({
    data: {
      dni: '',
      corre: ''
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

  const fetchData = clientData => {
    setState({ ...state, loading: true });
    signInClient(clientData.correo, clientData.dni).then(res => {
      if (res.token){
        signUp(res.token.token);
        delete res.data.paquete;
        delete res.data.pasaje;
        delete res.data.createdAt;
        setData({ ...globalData, data: res.data });
      }
      else
        message.warning(res.value.message);
      setState({ ...state, loading: false });
    }).catch(() => {
      message.error("Error 500: Fallo en los servidores");
      setState({ ...state, loading: false });
    });
  }
  
  return (
    <DashboardClient title="Ingresar">
      <Form name="register-client"
              layout="vertical"
              onSubmitCapture={handleSubmit}
              autoComplete="off">
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Correo electronico">
              <Input size="large"
                      value={state.data.correo}
                      name="correo" 
                      onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="DNI">
              <Input size="large" 
                      value={state.data.dni} 
                      name="dni"
                      onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          Si aun no estás registrado <Link to="/cliente/registro" style={{ marginLeft: 5, marginBottom: 20 }}>registrate aquí</Link>
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