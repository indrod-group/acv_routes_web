import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin } from 'antd';

const { Header, Content, Footer } = Layout;

const ChangePasswordModal = lazy(() => import('./ChangePasswordModal'));
const ProfileDescriptions = lazy(() => import('./ProfileDescriptions'));
const TreeAccounts = lazy(() => import('./Tree/Accounts'));

const Profile: React.FC = () => {
  return (
    <Layout>
      <Header className="flex top-0 w-full items-center justify-between print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Perfil
        </h2>
        <>
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <ChangePasswordModal />
          </Suspense>
        </>
      </Header>
      <Content className="md:flex">
        <Card
          className="max-w-xs md:mr-4"
          title="Información del perfil"
        >
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <ProfileDescriptions />
          </Suspense>
        </Card>
        <Card
          className="flex-grow mt-4 md:mt-0"
          title="Árbol de Cuentas"
        >
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <TreeAccounts />
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