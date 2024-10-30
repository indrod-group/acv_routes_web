import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { Form, Input, Button, Layout, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { UserToken } from '../../api/hooks/useToken'

type Credentials = {
  username: string;
  password: string;
}

type LoginProps = {
  setToken: (userToken: UserToken) => void;
};

async function loginUser(credentials: Credentials): Promise<UserToken> {
  const response = await axios.post<UserToken>(
    'https://api.road-safety-ec.com/api_generate_token/',
    credentials
  );
  return response.data;
}

const LoginForm: React.FC<LoginProps> = ({ setToken }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1000 });
  const title = isDesktopOrLaptop ? 'Bitácora de conducción y sistema de administración de vehículos' : 'Road Safety System';
  const navigate = useNavigate();
  
  const onFinish = (values: Credentials) => {
    loginUser(values).then(token => {
      setToken(token);
      Cookies.set('username', values.username);
      navigate('/dashboard/service-hours-log');
    }).catch((error: AxiosError) => {
      if (!navigator.onLine) {
        void message.error('No hay conexión a internet.');
      } else if (error.response && error.response.status === 400) {
        void message.error('Las credenciales son inválidas.');
      } else {
        void message.error('Ha habido un problema.')
      }
    });
  }

  return (
    <Layout className="layout flex flex-col min-h-screen h-screen m-0 mx-auto">
      <Layout.Header className="header flex justify-center items-center">
        <h1 className="text-white text-2xl text-center py-5">{title}</h1>
      </Layout.Header>
      <Layout.Content className="content">
        <Card
          title={
            <div className="flex flex-col justify-center items-center my-4">
              <img
                className="text-center mx-4 transition-all duration-500 ease-in-out transform scale-100"
                loading="lazy"
                width="150"
                height="400"
                src="/indrod-cmyk.svg"
                title="Logo"
                alt="Logo"
              />
            </div>
          }
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
        WanWayTechEcuador © {new Date().getFullYear()}
      </Layout.Footer>
    </Layout>
  );
};

export default LoginForm;
