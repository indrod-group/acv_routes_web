import React from 'react';

import type { MenuProps } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined,
    UserOutlined,
    HeatMapOutlined
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
    getItem('Rutas', '2', <HeatMapOutlined />,),
    getItem('Perfil', '3', <UserOutlined />,),
    getItem('Bitácora', '5', <DesktopOutlined />,),
    getItem('Cerrar sesión', '6', <LogoutOutlined />,),
];

export default menuItems;