import { useState, useEffect } from 'react';
import useToken from '../../Login/useToken';
import { Convert } from '../../../api/Conversor';
import { UserProfile } from '../../../api/models/UserProfile';
import axios from 'axios';
import Cookies from 'js-cookie';
import { message } from 'antd';

export function useProfile() {
  const { token } = useToken();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    const username: string | undefined = Cookies.get('username');
    if (!username) {
      console.error('No username cookie found');
      return;
    }
    axios.get(`https://twlxb59c-9090.use2.devtunnels.ms/api/v1/users/?search=${username}`, {
      headers: {
        Authorization: `Token ${token?.token as string}`,
      },
    })
      .then(response => {
        setUserProfile(Convert.toUserProfile(JSON.stringify(response.data)));
      })
      .catch(error => {
        void message.error(`No se ha podido mostrar el perfil del usuario: ${error as string}`);
      });
  }, [token]);

  return {
    userProfile,
    refreshUserProfile: () => setUserProfile(undefined),
  };
}
