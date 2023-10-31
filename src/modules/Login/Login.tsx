import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Layout, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { UserToken } from './useToken'

type Credentials = {
  username: string;
  password: string;
}

type LoginProps = {
  setToken: (userToken: UserToken) => void;
};

async function loginUser(credentials: Credentials): Promise<UserToken> {
  const response = await axios.post<UserToken>(
    'https://twlxb59c-8000.use2.devtunnels.ms/api_generate_token/',
    credentials
  );
  return response.data;
}

const LoginForm: React.FC<LoginProps> = ({ setToken }) => {
  const navigate = useNavigate();

  const onFinish = (values: Credentials) => {
    loginUser(values).then(token => {
      setToken(token);
      navigate('/dashboard/route-trip');
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <Layout className="layout flex flex-col min-h-screen h-screen m-0 mx-auto">
      <Layout.Header className="header flex justify-center items-center">
        <h1 className="text-white text-2xl">ACV - Rutas</h1>
      </Layout.Header>
      <Layout.Content className="content">
        <Card
          title={<Typography.Title className='text-center'>Login</Typography.Title>}
          className="login-card mx-auto my-12 p-4 bg-white rounded shadow-md w-full max-w-xs"
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '¡Por favor ingresa tu nombre de usuario!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon p-1" />} placeholder="Usuario" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '¡Por favor ingresa tu contraseña!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon p-1" />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>
            <Form.Item
              className='flex justify-center'
            >
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-600"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        ACV - Routes © {new Date().getFullYear()}
      </Layout.Footer>
    </Layout>
  );
};

export default LoginForm;
