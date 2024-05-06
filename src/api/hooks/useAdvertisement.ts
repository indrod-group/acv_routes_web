import { useState, useCallback } from 'react';
import { message } from 'antd';

import { Advertisement } from '../models/Advertisement';
import { Convert } from '../Conversor';
import useApi from './useApi';

/**
 * useAdvertisements hook
 * 
 * This hook is used to fetch and handle advertisements.
 * 
 * @returns The state and functions of the hook.
 * @returns .advertisements - The fetched advertisements.
 * @returns .fetchAdvertisements - The function to fetch advertisements.
 */
function useAdvertisements(): { advertisements: Advertisement[], fetchAdvertisements: () => void } {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const api = useApi();

  /**
   * fetchAdvertisements
   * 
   * This function is used to fetch advertisements.
   * The advertisements are sorted by priority and stored in the state.
   * If an error occurs while fetching the advertisements, an error message is displayed.
   */
  const fetchAdvertisements = useCallback(() => {
    api.get(`/advertisements/`)
      .then(response => {
        const advertisements = Convert.toAdvertisement(JSON.stringify(response.data));
        const sortedAdvertisements = Array.from(advertisements).sort((a, b) => b.priority - a.priority);
        setAdvertisements(sortedAdvertisements);
        void message.info('Advertisements have been successfully retrieved.');
      })
      .catch(error => {
        void message.error('There was a problem retrieving the advertisements.');
        console.error('Error fetching data: ', error);
      })
  }, [api]);

  return {
    advertisements: advertisements,
    fetchAdvertisements: fetchAdvertisements,
  } as const;
}

export default useAdvertisements;
