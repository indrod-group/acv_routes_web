import React from 'react';
import { Layout, Spin } from 'antd';

const LoadingComponent: React.FC = () => (
  <Layout className="flex justify-center items-center">
    <Spin size="large" tip="Cargando módulo..." />
  </Layout>
);

export default LoadingComponent;
