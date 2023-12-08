import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

import { UserProfile } from '../../../api/models/UserProfile';

type ProfileDescriptionsProps = {
  userProfile: UserProfile | undefined;
}

const ProfileDescriptions: React.FC<ProfileDescriptionsProps> = ({ userProfile }) => {
  const items: DescriptionsProps['items'] = userProfile ? [
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
  ] : [];

  return (
    <Descriptions
      column={1}
      title="Datos Personales"
      items={items}
    />
  );
}

export default ProfileDescriptions;
