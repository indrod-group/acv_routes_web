import React from 'react';

import type { MenuProps } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const menuItems: MenuItem[] = [
    getItem('Opción 1', '1', <PieChartOutlined />,),
    getItem('Opción 2', '2', <DesktopOutlined />,),
];

export default menuItems;