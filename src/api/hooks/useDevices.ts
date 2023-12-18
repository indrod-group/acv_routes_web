import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

import { Device } from '../models/Device';
import { Convert } from '../Conversor';
import useProfile from './useProfile';
import type { UserProfile } from '../models/UserProfile';
import useApi from './useApi';

/**
 * useDevices hook
 * 
 * This hook is used to fetch and handle devices associated with a specific user profile.
 * 
 * @returns {Object} The state and functions of the hook.
 * @returns {Device[]} .devices - The fetched devices, sorted by user name.
 * @returns {() => void} .fetchDevices - The function to fetch devices.
 */
function useDevices(): { devices: Device[], fetchDevices: () => void } {
  const { userProfile } = useProfile() as { userProfile: UserProfile };
  const [devices, setDevices] = useState<Device[]>([]);
  const api = useApi();

  /**
   * fetchDevices
   * 
   * This function is used to fetch devices associated with the user profile.
   * The devices are stored in the state.
   * If an error occurs while fetching the devices, an error message is displayed.
   */
  const fetchDevices = useCallback(() => {
    if (userProfile) {
      api.get(`/user-devices/${userProfile.uuid}/`)
        .then(response => {
          const devices = Convert.toDevices(JSON.stringify(response.data));
          const sortedDevices = Array.from(devices).sort((a, b) => a.user_name.localeCompare(b.user_name));
          setDevices(sortedDevices);
          void message.info('Los dispositivos se han obtenido correctamente.');
        })
        .catch(error => {
          console.error('Error fetching devices: ', error);
          void message.error('Ha habido un problema obteniendo los dispositivos.');
        });
    }
  }, [api, userProfile]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return {
    devices: devices,
    fetchDevices: fetchDevices,
  } as const;
}

export default useDevices;