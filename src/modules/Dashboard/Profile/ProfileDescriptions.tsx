import React from 'react';
import { Avatar, Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

import { useProfile } from '../../../api/hooks';
import type { UserProfile } from '../../../api/models';

const ProfileDescriptions: React.FC = () => {
  const { userProfile } = useProfile() as { userProfile: UserProfile };
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
      label: 'Roles',
      children: <p>{userProfile.roles.join(', ')}</p>,
    },
    {
      key: '7',
      label: 'Cuentas Principales',
      children: <p>{userProfile?.parent_accounts.join(', ')}</p>,
    },
    {
      key: '8',
      label: 'Fecha de Nacimiento',
      children: <p>{userProfile.birth_date ? (() => {
        const dateParts = userProfile.birth_date.split('-').map(part => parseInt(part, 10));
        return new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2] + 1)).toLocaleDateString();
      })() : 'No disponible'}</p>,
    },
    {
      key: '9',
      label: 'Estado Civil',
      children: <p>{userProfile?.marital_status}</p>,
    },
    {
      key: '10',
      label: 'Nivel de Educación',
      children: <p>{userProfile.education_level}</p>,
    },
    {
      key: '11',
      label: 'Dirección de Casa',
      children: <p>{userProfile?.home_address}</p>,
    },
  ] : [];

  return (
    <>
      <div className="flex justify-center items-center mb-2">
        <Avatar src={userProfile?.photo || undefined} size={128} />
      </div>      <Descriptions
        column={1}
        title="Datos Personales"
        items={items}
      />
    </>

  );
}

export default ProfileDescriptions;