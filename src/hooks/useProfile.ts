import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { message } from 'antd';

import { Convert } from '../helpers/Conversor';
import { UserProfile } from '../Entities/UserProfile';
import useApi from './useApi';

const USER_PROFILE_KEY = 'userProfile';

/**
 * saveUserProfileToCookie
 * 
 * This function is used to save the user profile to a cookie.
 * 
 * @param {UserProfile} profile - The user profile to be saved.
 */
const saveUserProfileToCookie = (profile: UserProfile) => {
  Cookies.set(USER_PROFILE_KEY, JSON.stringify(profile));
};

/**
 * getUserProfileFromCookie
 * 
 * This function is used to get the user profile from a cookie.
 * 
 * @returns {UserProfile | null} The user profile from the cookie or null if not found.
 */
const getUserProfileFromCookie = (): UserProfile | null => {
  const profile = Cookies.get(USER_PROFILE_KEY);
  return profile ? JSON.parse(profile) as UserProfile : null;
};

/**
 * useProfile hook
 * 
 * This hook is used to fetch and handle the user profile.
 * 
 * @returns {Object} The state and functions of the hook.
 * @returns {UserProfile | null} .userProfile - The fetched user profile.
 * @returns {() => void} .refreshUserProfile - The function to refresh the user profile.
 */
const useProfile = (): { userProfile: UserProfile | null, refreshUserProfile: () => void } => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const api = useApi();

  /**
   * fetchUserProfile
   * 
   * This function is used to fetch the user profile.
   * If an error occurs while fetching the user profile, an error message is displayed.
   */
  const fetchUserProfile = useCallback(() => {
    const username: string | undefined = Cookies.get('username');
    if (!username) {
      return;
    }
    api.get(`/users/?search=${username}`)
      .then(response => {
        const profile = Convert.toUserProfile(JSON.stringify(response.data));
        setUserProfile(profile);
        saveUserProfileToCookie(profile);
        void message.info('Los datos del usuario se han cargado correctamente.');
      })
      .catch(error => {
        console.error(error);
        void message.error('Ha habido un problema obteniendo los datos del usuario');
      });
  }, [api]);

  useEffect(() => {
    const profileFromCookie = getUserProfileFromCookie();
    if (profileFromCookie) {
      setUserProfile(profileFromCookie);
      return;
    }
    fetchUserProfile();
  }, [api, fetchUserProfile]);
 
  return {
    userProfile: userProfile,
    refreshUserProfile: () => {
      Cookies.remove('userProfile');
      setUserProfile(null);
    },
  } as const;
}

export default useProfile;