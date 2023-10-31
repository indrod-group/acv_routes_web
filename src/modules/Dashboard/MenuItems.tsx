import React from 'react';

import type { MenuProps } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined
} from '@ant-design/icons';

export type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const menuItems: MenuItem[] = [
    getItem('Rutas de viaje', '1', <PieChartOutlined />,),
    getItem('Vehículos', '2', <DesktopOutlined />,),
    getItem('Cerrar sesión', '3', <LogoutOutlined />,),
];

export default menuItems;