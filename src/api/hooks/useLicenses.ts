import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

import { License } from '../models/License';
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
 * @returns {License[]} .devices - The fetched devices, sorted by user name.
 * @returns {() => void} .fetchDevices - The function to fetch devices.
 */
function useLicenses(): { licenses: License[], fetchLicenses: () => void } {
  const { userProfile } = useProfile() as { userProfile: UserProfile };
  const [licenses, setLicenses] = useState<License[]>([]);
  const api = useApi();

  /**
   * fetchDevices
   * 
   * This function is used to fetch devices associated with the user profile.
   * The devices are stored in the state.
   * If an error occurs while fetching the devices, an error message is displayed.
   */
  const fetchLicenses = useCallback(() => {
    if (userProfile) {
      api.get(`/users/${userProfile.uuid}/licenses/`)
        .then(response => {
          console.log(response.data);
          const licenses = Convert.toLicenses(JSON.stringify(response.data));
          console.log(licenses);
          const sortedLicenses = Array.from(licenses).sort((a, b) => a.expiry_date.localeCompare(b.expiry_date));
          setLicenses(sortedLicenses);
          void message.info('Las licencias se han obtenido correctamente.');
        })
        .catch(error => {
          console.error('Error fetching devices: ', error);
          void message.error('Ha habido un problema obteniendo las licencias.');
        });
    }
  }, [api, userProfile]);

  useEffect(() => {
    fetchLicenses();
  }, [fetchLicenses]);

  return {
    licenses: licenses,
    fetchLicenses: fetchLicenses,
  } as const;
}

export default useLicenses;