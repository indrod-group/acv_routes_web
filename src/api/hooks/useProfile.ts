import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

import { Convert } from '../Conversor';
import { UserProfile } from '../models/UserProfile';
import useApi from './useApi';

const USER_PROFILE_KEY = 'userProfile';

const saveUserProfileToCookie = (profile: UserProfile) => {
  Cookies.set(USER_PROFILE_KEY, JSON.stringify(profile));
};

const getUserProfileFromCookie = (): UserProfile | null => {
  const profile = Cookies.get(USER_PROFILE_KEY);
  return profile ? JSON.parse(profile) as UserProfile : null;
};

const useProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const api = useApi();

  useEffect(() => {
    const username: string | undefined = Cookies.get('username');
    if (!username || !api) {
      return;
    }

    const profileFromCookie = getUserProfileFromCookie();
    if (profileFromCookie) {
      setUserProfile(profileFromCookie);
      return;
    }

    api.get(`/users/?search=${username}`)
      .then(response => {
        const profile = Convert.toUserProfile(JSON.stringify(response.data));
        setUserProfile(profile);
        saveUserProfileToCookie(profile);
      })
      .catch(error => {
        void message.error('No se ha podido mostrar el perfil del usuario');
        console.error(error);
      });
  }, [api]);
 
  return {
    userProfile: userProfile,
    refreshUserProfile: () => {
      Cookies.remove('userProfile');
      setUserProfile(null);
    },
  } as const;
}

export default useProfile;