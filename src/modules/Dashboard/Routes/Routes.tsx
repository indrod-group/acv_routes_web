import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin } from 'antd';
import { useRoutePositions } from './useRoutePositions';

const { Header, Content, Footer } = Layout;

const RouteTable = lazy(() => import('./RouteTable'));

const RoutesComponent: React.FC = () => {
  const { routePositions } = useRoutePositions();

  return (
    <Layout className="site-layout">
      <Header className="flex top-0 w-full  items-center justify-center print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Rutas
        </h2>
      </Header>
      <Content>
        <Card title="Información de las rutas">
          <Suspense fallback={<Spin tip="Buscando rutas..."/>}>
            <RouteTable routePositions={routePositions} />
          </Suspense>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default RoutesComponent;
