import React, { useState } from 'react';
import { Button, Card, Divider, Input, message } from 'antd';

import { useProfile, useChangePassword } from '../../../api/hooks';
import type { UserProfile } from '../../../api/models';

const ChangePassword: React.FC = () => {
  const { userProfile } = useProfile() as { userProfile: UserProfile };
  const { changePassword } = useChangePassword();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (userProfile) {
      try {
        setLoading(true);
        await changePassword({
          uuid: userProfile.uuid,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        });
        setLoading(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  }

  const handleClick = () => {
    if (newPassword !== confirmNewPassword) {
      void message.warning('Las contraseñas no coinciden.')
      return;
    }
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
      <Divider />
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
      <Divider />
      <Button onClick={handleClick} disabled={loading}>
        {loading ? 'Cambiando...' : 'Cambiar contraseña'}
      </Button>
    </Card>
  );
}

export default ChangePassword;
