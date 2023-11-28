import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useToken from '../../Login/useToken';
import { Alarm } from '../../../api/models/Alarm';
import { Convert } from '../../../api/Conversor';

interface UseAlarmProps {
  imei: string | null;
  startTime: number | null;
  endTime: number | null;
}

export function useAlarms({imei, startTime, endTime}: UseAlarmProps) {
  const { token } = useToken();
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  const fetchAlarms = useCallback(() => {
    if (imei && startTime && endTime && token) {
      axios.get(`http://127.0.0.1:8001/api/v1/alarms/?imei=${imei}&start_time=${startTime}&end_time=${endTime}`, {
        headers: {
          'Authorization': `Token ${token.token}`
        }
      })
        .then(response => {
          setAlarms(Convert.toAlarms(JSON.stringify(response.data)));
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        })
    }
  }, [imei, startTime, endTime, token]);

  useEffect(() => {
    fetchAlarms();
  }, [fetchAlarms]);

  const sortedData = Array.from(alarms).sort((a, b) => a.time - b.time);

  return {
    alarms: sortedData,
    fetchAlarms: fetchAlarms,
  };
}
