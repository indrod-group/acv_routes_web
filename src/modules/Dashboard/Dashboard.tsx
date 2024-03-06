import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import SidebarMenu from './MenuSidebar';
import LoadingComponent from './LoadingComponent';

const JourneyTracker = React.lazy(() => import('./VehicleRoutes/JourneyTracker'));
const Profile = React.lazy(() => import('./Profile/Profile'));
const ServiceHoursLogModule = React.lazy(() => import('./ServiceHoursLog/ServiceHoursLog'));
const RoutesComponent = React.lazy(() => import('./Routes/Routes'));
const TreeAccount = React.lazy(() => import('./TreeAccounts/TreeAccounts'));
const VehiclesModule = React.lazy(() => import('./Vehicles/VehiclesModule'));

const Dashboard: React.FC = () => {
  return (
    <Layout className='w-auto min-h-screen' hasSider>
      <SidebarMenu/>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/journey-tracker" element={<JourneyTracker />} />
          <Route path="/routes" element={<RoutesComponent />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/service-hours-log" element={<ServiceHoursLogModule />} />
          <Route path="/tree-accounts" element={<TreeAccount />} />
        </Routes>
      </Suspense>
    </Layout >
  );
};

export default Dashboard;
