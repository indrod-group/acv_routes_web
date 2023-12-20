import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin, Watermark } from 'antd';

const { Header, Content, Footer } = Layout;

const TreeAccount = lazy(() => import('./TreeAccount'));

const Profile: React.FC = () => {
  return (
    <Layout>
      <Header className="flex top-0 w-full  items-center justify-center print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Perfil
        </h2>
      </Header>
      <Content>
        <Watermark
          content="En pruebas"
          zIndex={1000}
          rotate={-22}
        >
          <Card
            className="max-w-xs"
            title="Subcuentas"
          >
            <Suspense fallback={<Spin tip="Cargando datos..." />}>
              <TreeAccount />
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

export default Profile;
