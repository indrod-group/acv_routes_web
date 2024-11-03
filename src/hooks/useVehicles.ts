import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

import { Vehicle } from '../Entities/Vehicle';
import { Convert } from '../helpers/Conversor';
import useProfile from './useProfile';
import type { UserProfile } from '../Entities/UserProfile';
import useApi from './useApi';

/**
 * useDevices hook
 * 
 * This hook is used to fetch and handle devices associated with a specific user profile.
 * 
 * @returns {Object} The state and functions of the hook.
 * @returns {Vehicle[]} .devices - The fetched devices, sorted by user name.
 * @returns {() => void} .fetchDevices - The function to fetch devices.
 */
function useVehicles(): { vehicles: Vehicle[], fetchVehicles: () => void } {
  const { userProfile } = useProfile() as { userProfile: UserProfile };
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const api = useApi();

  const fetchVehicles = useCallback(() => {
    if (userProfile) {
      api.get(`/users/${userProfile.uuid}/vehicles/`)
        .then(response => {
          const devices = Convert.toVehicles(JSON.stringify(response.data));
          setVehicles(devices);
          void message.info('Los vehículos se han obtenido correctamente.');
        })
        .catch(error => {
          console.error('Error fetching vehicles: ', error);
          void message.error('Ha habido un problema obteniendo los vehículos.');
        });
    }
  }, [api, userProfile]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles: vehicles,
    fetchVehicles: fetchVehicles,
  } as const;
}

export default useVehicles;