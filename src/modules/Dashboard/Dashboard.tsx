import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import Logo from './Logo';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: '1', icon: <PieChartOutlined />, label: 'Opción 1' },
    { key: '2', icon: <DesktopOutlined />, label: 'Opción 2' },
  ];

  return (
    <Layout
      className='w-auto'
      hasSider
      style={{ minHeight: '100vh' }}
    >
      <Sider
        className='print:hidden'
        style={{
          overflow: 'auto',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
      >
        <Logo collapsed={collapsed} />
        <Menu
          items={menuItems}
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
        >
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background print:hidden"
          style={{
            top: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: 'lightgray',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'lightgray'}
          />
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-right text-ellipsis">
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
