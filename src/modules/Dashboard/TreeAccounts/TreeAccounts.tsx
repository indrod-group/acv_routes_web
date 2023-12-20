import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin } from 'antd';

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
        <Card
          className="max-w-xs"
          title="Subcuentas"
        >
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <TreeAccount />
          </Suspense>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default Profile;
