import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Logo from './Logo';
import menuItems from './MenuItems';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='w-auto min-h-screen' hasSider>
      <Sider
        className='overflow-auto left-0 top-0 bottom-0 print:hidden'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
      >
        <Logo collapsed={collapsed}/>
        <Menu items={menuItems} theme="dark" defaultSelectedKeys={['1']} mode="inline"/>
      </Sider>
      <Layout className="site-layout">
        <Header className="flex top-0 w-full  items-center justify-center print:hidden">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
            Título del módulo
          </h2>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background p-6 min-h-[360px]">
            Contenido del Dashboard
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
