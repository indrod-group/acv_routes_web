import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import JourneyTracker from './VehicleRoutes/JourneyTracker';
import Logo from './Logo';
import menuItems from './MenuItems';
import Profile from './Profile/Profile';
import { useProfile } from './Profile/useProfile';

const { Sider } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userProfile } = useProfile();
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
    '3': () => navigateAndGo('/dashboard/user-profile'),
    '4': handleLogout,
  };

  const handleRoute = (key: string) => {
    const routeFunction = routes[key];
    if (routeFunction) {
      routeFunction();
    }
  }

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
      <Routes>
        <Route path="/journey-tracker" element={<JourneyTracker />} />
        <Route path="/vehicles" element={<JourneyTracker />} />
        <Route path="/user-profile" element={<Profile userProfile={userProfile} />} />
      </Routes>

    </Layout >
  );
};

export default Dashboard;
