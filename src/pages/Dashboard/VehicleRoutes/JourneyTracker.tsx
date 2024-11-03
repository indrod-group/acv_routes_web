import React from 'react';
import { Layout } from 'antd';
import Map from './Map';

const { Header, Content } = Layout;

const JourneyTracker: React.FC = () => {

  return (
    <Layout className="site-layout">
      <Header className="flex top-0 w-full  items-center justify-center print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Rutas de viajes
        </h2>
      </Header>
      <Content>
        <Map/>
      </Content>
    </Layout>
  );
}

export default JourneyTracker;
