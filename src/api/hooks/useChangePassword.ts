import { useCallback } from 'react';
import { message } from 'antd';

import useApi from './useApi';

/**
 * Interface for the parameters required to change a user's password.
 */
interface ChangePasswordParams {
  uuid: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/**
 * Custom React hook for changing a user's password.
 * 
 * @returns An object with a `changePassword` function that takes a `ChangePasswordParams` object and returns a Promise.
 */
const useChangePassword = (): { changePassword: (params: ChangePasswordParams) => Promise<void> } => {
  const api = useApi();

  /**
   * Function to change a user's password.
   * 
   * @param params - An object of type `ChangePasswordParams` containing the user's UUID, old password, new password, and confirmation of the new password.
   * @returns A Promise that resolves when the password has been successfully changed.
   */
  const changePassword = useCallback(async (params: ChangePasswordParams) => {
    try {
      await api.put(`/change-password/${params.uuid}/`, {
        uuid: params.uuid,
        old_password: params.oldPassword,
        new_password: params.newPassword,
        confirm_new_password: params.confirmNewPassword
      });
      void message.info('La contraseña ha sido actualizada.');
    } catch (error) {
      console.error(error);
      void message.error('Ha habido un problema actualizando la contraseña.');
    }
  }, [api]);  

  return { changePassword } as const;
}

export default useChangePassword;