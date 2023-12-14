import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useToken from '../../Login/useToken';
import { Device } from '../../../api/models/Device';
import { Convert } from '../../../api/Conversor';
import { useProfile } from '../Profile/useProfile';

export function useDevices() {
  const { token } = useToken();
  const { userProfile } = useProfile();
  const [devices, setDevices] = useState<Device[]>([]);

  const fetchDevices = useCallback(() => {
    if (userProfile) {
      axios.get(`https://twlxb59c-9090.use2.devtunnels.ms/api/v1/user-devices/${userProfile.uuid}/`, {
        headers: {
          'Authorization': `Token ${token!.token}`
        },
      })
        .then(response => {
          setDevices(Convert.toDevices(JSON.stringify(response.data)));
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
    } else {
      console.error('userProfile is undefined');
    }
  }, [token, userProfile]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const sortedData = Array.from(devices).sort((a, b) => a.user_name.localeCompare(b.user_name));

  return {
    devices: sortedData,
    fetchDevices: fetchDevices,
  };
}
