import React, { useState } from 'react';
import { Button, Input, Card, message } from 'antd';

import { useProfile, useChangePassword } from '../../../api/hooks';
import type { UserProfile } from '../../../api/models';

const ChangePassword: React.FC = () => {
  const { userProfile } = useProfile() as { userProfile: UserProfile };
  const { changePassword } = useChangePassword();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = async () => {
    if (userProfile) {
      try {
        await changePassword({
          uuid: userProfile.uuid,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleClick = () => {
    handleSubmit().catch(error => {
      void message.error('Definitivamente no se pudo actualizar tu contraseña.');
      console.error(error);
    });
  }

  return (
    <Card
      className="max-w-xs"
      title="Cambiar contraseña"
    >
      <Input.Password
        placeholder="Anterior contraseña"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
      />
      <Input.Password
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <Input.Password
        placeholder="Confirmar nueva contraseña"
        value={confirmNewPassword}
        onChange={e => setConfirmNewPassword(e.target.value)}
      />
      <Button onClick={handleClick}>Cambiar contraseña</Button>
    </Card>
  );

}

export default ChangePassword;
