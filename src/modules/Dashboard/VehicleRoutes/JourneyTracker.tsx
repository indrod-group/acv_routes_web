import React from 'react';
import { Layout } from 'antd';
import Map from './Map';

const { Header, Content, Footer } = Layout;


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
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default JourneyTracker;
