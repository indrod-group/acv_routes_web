import React, { Suspense, lazy } from 'react';
import { Card, Layout, Spin, Tabs, type TabsProps } from 'antd';

const { Header, Content, Footer } = Layout;

const VehicleList = lazy(() => import('./VehiclesList'));
const TiresCard =  lazy(() => import('./TiresCard'));
const BatteryCard =  lazy(() => import('./BatteryCard'));
const MaintenanceHistoryCard =  lazy(() => import('./MaintenanceHistory'));
const MovementOrdersCard =  lazy(() => import('./MovementsOrders'));

const VehiclesModule: React.FC = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Mis vehículos',
      children: <>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <VehicleList />
        </Suspense>
      </>
    },
    {
      key: '3',
      label: 'Llantas',
      children: <>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <TiresCard />
        </Suspense>
      </>
    },
    {
      key: '4',
      label: 'Baterías',
      children: <>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <BatteryCard />
        </Suspense>
      </>
    },
    {
      key: '5',
      label: 'Historial de mantenimiento',
      children: <>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <MaintenanceHistoryCard />
        </Suspense>
      </>
    },
    {
      key: '6',
      label: 'Órdenes de movimiento',
      children: <>
        <Suspense fallback={<Spin tip="Cargando datos..." />}>
          <MovementOrdersCard />
        </Suspense>
      </>
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="flex top-0 w-full items-center justify-center print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Mis Vehículos
        </h2>
      </Header>
      <Content>
        <Card>
          <Tabs
            className='print:hidden'
            defaultActiveKey="1"
            items={items}
          />
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default VehiclesModule;
