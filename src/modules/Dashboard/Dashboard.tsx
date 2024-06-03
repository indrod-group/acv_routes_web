import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import SidebarMenu from './MenuSidebar';
import LoadingComponent from './LoadingComponent';
import { VehicleProvider } from './Vehicles/VehicleContext';

const Profile = React.lazy(() => import('./Profile/Profile'));
const ServiceHoursLogModule = React.lazy(() => import('./ServiceHoursLog/ServiceHoursLog'));
const VehiclesModule = React.lazy(() => import('./Vehicles/VehiclesModule'));
const RoutesModule = React.lazy(() => import('./Routes/Routes'));
const MapModule = React.lazy(() => import('./VehicleRoutes/JourneyTracker'));

const Dashboard: React.FC = () => {
  return (
    <Layout className='w-auto min-h-screen' hasSider>
      <SidebarMenu />
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/journey-tracker" element={<MapModule/>} />
          <Route path="/routes" element={<RoutesModule/>}/>
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/service-hours-log" element={<ServiceHoursLogModule />} />
          <Route path="/vehicles" element={
            <VehicleProvider>
              <VehiclesModule />
            </VehicleProvider>
          } />
        </Routes>
      </Suspense>
    </Layout >
  );
};

export default Dashboard;
