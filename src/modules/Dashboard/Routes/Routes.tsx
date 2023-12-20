import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin, Watermark } from 'antd';
import { useRoutePositions } from '../../../api/hooks';

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
        <Watermark
          content="En pruebas"
          zIndex={1000}
          rotate={-22}
        >
          <Card title="Información de las rutas">
            <Suspense fallback={<Spin tip="Buscando rutas..." />}>
              <RouteTable routePositions={routePositions} />
            </Suspense>
          </Card>
        </Watermark>

      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default RoutesComponent;
