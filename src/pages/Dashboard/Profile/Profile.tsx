import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin } from 'antd';

const { Header, Content, Footer } = Layout;

const ProfileDescriptions = lazy(() => import('./ProfileDescriptions'));

const Profile: React.FC = () => {
  return (
    <Layout>
      <Header className="flex top-0 w-full items-center justify-between print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Perfil
        </h2>
      </Header>
      <Content className="w-full flex justify-center">
        <Card className="max-w-sm w-full" title="Información del perfil">
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <ProfileDescriptions />
          </Suspense>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default Profile;
