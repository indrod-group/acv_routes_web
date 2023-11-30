import { useState, useEffect, useCallback, useMemo } from 'react';
import useToken from '../../Login/useToken';
import { Convert } from '../../../api/Conversor';
import { UserProfile } from '../../../api/models/UserProfile';
import axios from 'axios';
import Cookies from 'js-cookie';
import { message } from 'antd';

export function useProfile() {
  const { token } = useToken();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  const getUserProfile = useCallback(() => {
    const username: string | undefined = Cookies.get('username');
    if (!username) {
      console.error('No username cookie found');
      return;
    }
    axios.get(`https://twlxb59c-8001.use2.devtunnels.ms/api/v1/users/?search=${username}`, {
      headers: {
        Authorization: `Token ${token?.token as string}`,
      },
    })
      .then(response => {
        setUserProfile(Convert.toUserProfile(JSON.stringify(response.data)));
      })
      .catch(error => {
        void message.error('No se ha podido mostrar el perfil del usuario');
        console.error(error);
      });

  }, [token]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const memoizedUserProfile = useMemo(() => userProfile, [userProfile]);

  return {
    userProfile: memoizedUserProfile,
    getUserProfile: getUserProfile,
  };
}