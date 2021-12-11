import React, { Component } from 'react'
import { Row, Button, Table, Form, Input, message } from 'antd';

import DashboardUser from '../../Layout/DashboardUser';
import { createCode, getCodes } from '../../services/Services';

class Codes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingTable: true,
      loadingSubmit: false,
      inputValue: ""
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data === this.state.data) {
      this.fetchData();
    }
  }

  async fetchData() {
    try {
      const response = await getCodes();
      const dataFormat = response.map(code => {
        return { ...code, key: code.id }
      });
      this.setState({
        data: dataFormat,
        loadingTable: false
      });
    } catch (error) {
      message.error(error.message);
    }
  }

  render() {

    const handleSubmit = () => {
      if (this.state.inputValue.trim() === "") {
        message.warning("Campo vacio.");
        return;
      }
      this.setState({ loadingSubmit: true });
      createCode({ codigo: this.state.inputValue }).then(res => {
        if (res.statusCode === 201) message.success(res.message);
        else if (res.statusCode === 401) message.warning(res.message);
        else message.warning(res.title);
        this.setState({ loadingSubmit: false, inputValue: "" });
      }).catch(error => message.error(error.message));
    }

    const handleChange = e => this.setState({ inputValue: e.target.value.toUpperCase() });

    const columns = [
      {
        title: '#',
        dataIndex: 'id'
      },
      {
        title: 'Código',
        dataIndex: 'codigo'
      },
      {
        title: 'Usado',
        dataIndex: 'usado',
        align: 'center',
        render: x => (
          <span style={{ color: x ? "lime" : "red" }}>{x ? "SI" : "NO"}</span>
        )
      }
    ]
    
    return (
      <DashboardUser title="Generar Códigos">
        <Table size="small" 
                columns={columns} 
                scroll={{ y: 250 }}
                loading={this.state.loadingTable}
                dataSource={this.state.data} />
        <Form onSubmitCapture={handleSubmit}>
          <Row justify="space-around">
            <Form.Item>
              <Input value={this.state.inputValue} 
                      onChange={handleChange}
                      placeholder="Ejemplo: H7G6F5" />
            </Form.Item>
            <Form.Item>
              <Button type="primary"
                      loading={this.state.loadingSubmit}
                      htmlType="submit">
                Generar código
              </Button>
            </Form.Item>
          </Row>
        </Form>
        <Row justify="center" style={{ marginTop: 10 }}>
          <Button size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => this.props.history.goBack()}
                  danger>
            Atrás
          </Button>
        </Row>
      </DashboardUser>
    )
  }
}

export default Codes;