import { useState, useCallback } from 'react';
import { message } from 'antd';

import { Alarm } from '../Entities/Alarm';
import { Convert } from '../helpers/Conversor';
import useApi from './useApi';

interface UseAlarmProps {
  imei: string | null;
  startTime: number | null;
  endTime: number | null;
}

/**
 * useAlarms hook
 * 
 * This hook is used to fetch and handle alarms from a specific device.
 * 
 * @param props - The properties of the hook.
 * @param props.imei - The IMEI of the device.
 * @param props.startTime - The start time for fetching alarms.
 * @param props.endTime - The end time for fetching alarms.
 * 
 * @returns The state and functions of the hook.
 * @returns .alarms - The fetched alarms.
 * @returns .fetchAlarms - The function to fetch alarms.
 */
function useAlarms({imei, startTime, endTime}: UseAlarmProps): { alarms: Alarm[], fetchAlarms: () => void } {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const api = useApi();

  /**
   * fetchAlarms
   * 
   * This function is used to fetch alarms from a specific device.
   * The alarms are sorted by time and stored in the state.
   * If an error occurs while fetching the alarms, an error message is displayed.
   */
  const fetchAlarms = useCallback(() => {
    if (imei && startTime && endTime) {
      api.get(`/alarms/?imei=${imei}&start_time=${startTime}&end_time=${endTime}`)
        .then(response => {
          const alarms = Convert.toAlarms(JSON.stringify(response.data));
          const sortedAlarms = Array.from(alarms).sort((a, b) => a.time - b.time);
          setAlarms(sortedAlarms);
          void message.info('Las alarmas del dispositivo se han obtenido correctamente.');
        })
        .catch(error => {
          void message.error('Ha habido un problema obteniendo las alarmas.');
          console.error('Error fetching data: ', error);
        })
    }
  }, [imei, startTime, endTime, api]);

  return {
    alarms: alarms,
    fetchAlarms: fetchAlarms,
  } as const;
}

export default useAlarms;