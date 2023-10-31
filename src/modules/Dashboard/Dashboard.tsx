import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import JourneyTracker from './VehicleRoutes/JourneyTracker';
import Logo from './Logo';
import menuItems from './MenuItems';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  const navigateAndGo = (url: string) => {
    navigate(url);
    setCollapsed(true);
  }

  const routes: Record<string, () => void> = {
    '1': () => navigateAndGo('/dashboard/journey-tracker'),
    '2': () => navigateAndGo('/dashboard/vehicles'),
    '3': handleLogout,
  };

  const handleRoute = (key: string) => {
    const routeFunction = routes[key];
    if (routeFunction) {
      routeFunction();
    }
  }

  const titles: Record<string, string> = {
    '/dashboard/journey-tracker': 'Rutas de viaje',
    '/dashboard/vehicles': 'Vehículos',
  };

  const title = titles[location.pathname] || 'Título por defecto';

  return (
    <Layout className='w-auto min-h-screen' hasSider>
      <Sider
        className='overflow-auto left-0 top-0 bottom-0 print:hidden'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
      >
        <Logo collapsed={collapsed} />
        <Menu
          items={menuItems}
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onClick={({ key }) => { handleRoute(key) }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="flex top-0 w-full  items-center justify-center print:hidden">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
            {title}
          </h2>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background p-6 min-h-[360px]">
            <Routes>
              <Route path="/journey-tracker" element={<JourneyTracker />} />
              <Route path="/vehicles" element={<JourneyTracker />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          WanWayTech © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout >
  );
};

export default Dashboard;
