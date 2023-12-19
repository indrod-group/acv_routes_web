import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import JourneyTracker from './VehicleRoutes/JourneyTracker';
import Profile from './Profile/Profile';
import ServiceHoursLogModule from './ServiceHoursLog/ServiceHoursLog';
import RoutesComponent from './Routes/Routes';
import SidebarMenu from './MenuSidebar';

const Dashboard: React.FC = () => {
  return (
    <Layout className='w-auto min-h-screen' hasSider>
      <SidebarMenu/>
      <Routes>
        <Route path="/journey-tracker" element={<JourneyTracker />} />
        <Route path="/routes" element={<RoutesComponent />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/service-hours-log" element={<ServiceHoursLogModule />} />
      </Routes>
    </Layout >
  );
};

export default Dashboard;
