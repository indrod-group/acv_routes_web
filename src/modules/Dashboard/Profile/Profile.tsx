import React, { useMemo } from 'react';

import { Layout, Card, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

import { UserProfile } from '../../../api/models/UserProfile';

const { Header, Content, Footer } = Layout;

type ProfileProps = {
  userProfile: UserProfile | undefined;
}

const Profile: React.FC<ProfileProps> = ({ userProfile }) => {

  const items: DescriptionsProps['items'] = useMemo(() => {
    if (!userProfile) {
      return [];
    }

    return [
      {
        key: '1',
        label: 'Email',
        children: <p>{userProfile.email}</p>,
      },
      {
        key: '2',
        label: 'Nombre',
        children: <p>{userProfile.first_name}</p>,
      },
      {
        key: '3',
        label: 'Apellido',
        children: <p>{userProfile.last_name}</p>,
      },
      {
        key: '4',
        label: 'Activo',
        children: <p>{userProfile.is_active ? 'Sí' : 'No'}</p>,
      },
      {
        key: '5',
        label: 'ID Card',
        children: <p>{userProfile.id_card}</p>,
      },
      {
        key: '6',
        label: 'Rol',
        children: <p>{userProfile.role}</p>,
      },
    ]
  }, [userProfile]);

  return (
    <Layout className="site-layout">
      <Header className="flex top-0 w-full  items-center justify-center print:hidden">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-opacity-80 text-ellipsis">
          Perfil
        </h2>
      </Header>
      <Content>
        <Card title="Información del perfil">
          <Descriptions title="Datos Personales" items={items}/>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WanWayTech © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default Profile;
