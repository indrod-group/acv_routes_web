import { useState } from 'react';
import { Layout, Menu } from 'antd';

import Logo from './Logo';
import menuItems from './MenuItems';
import NavigationHandler from './NavigationHandler';

const { Sider } = Layout;

const SidebarMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleRoute = NavigationHandler();

  return (
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
  );
}

export default SidebarMenu;