import React, { Suspense, lazy } from 'react';
import { Layout, Card, Spin } from 'antd';

const { Header, Content, Footer } = Layout;

const ChangePasswordModal = lazy(() => import('./ChangePasswordModal'));
const ProfileDescriptions = lazy(() => import('./ProfileDescriptions'));
const TreeAccounts = lazy(() => import('./Tree/Accounts'));
const License = lazy(() => import('./License'));

const Profile: React.FC = () => {
  return (
    <Layout>
      <Header className="flex top-0 w-full items-center justify-between print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Perfil
        </h2>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <ChangePasswordModal />
        </Suspense>
      </Header>
      <Content className="w-full md:flex">
        <Card
          className="max-w-sm md:mr-4"
          title="Información del perfil"
        >
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <ProfileDescriptions />
          </Suspense>
        </Card>
        <Layout
          className='max-w-xl items-center justify-center'
        >
          <Suspense fallback={<Spin tip="Cargando datos..." />}>
            <License />
          </Suspense>
          <Card
            className="flex-grow max-w-xl w-full mt-4 md:mt-0"
            title="Árbol de Cuentas"
          >
            <Suspense fallback={<Spin tip="Cargando datos..." />}>
              <TreeAccounts />
            </Suspense>
          </Card>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default Profile;