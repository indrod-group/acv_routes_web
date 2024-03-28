import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

import { Convert } from '../Conversor';
import { UserProfile } from '../models/UserProfile';
import useApi from './useApi';

/**
 * useTreeAccount hook
 * 
 * This hook is used to fetch and handle the tree of accounts.
 * 
 * @returns {Object} The state and functions of the hook.
 * @returns {UserProfile[] | null} .treeAccounts - The fetched tree of accounts.
 * @returns {() => void} .refreshTreeAccounts - The function to refresh the tree of accounts.
 */
const useTreeAccount = (uuid: string): { treeAccounts: UserProfile | null, refreshTreeAccounts: () => void } => {
  const [treeAccounts, setTreeAccounts] = useState<UserProfile | null>(null);
  const api = useApi();

  /**
   * fetchTreeAccounts
   * 
   * This function is used to fetch the tree of accounts.
   * If an error occurs while fetching the tree of accounts, an error message is displayed.
   */
  const fetchTreeAccounts = useCallback(() => {
    if (!uuid) {
      console.error('UUID no proporcionado');
      return;
    }
  
    api.get(`/users/${uuid}/tree/accounts/`)
      .then(response => {
        const accounts = Convert.toUserProfile(JSON.stringify(response.data));
        setTreeAccounts(accounts);
        void message.info('El árbol de subcuentas se ha cargado correctamente.');
      })
      .catch(error => {
        console.error(error);
        void message.error('Ha habido un problema obteniendo el árbol de subcuentas');
      });
  }, [api, uuid]);  

  useEffect(() => {
    fetchTreeAccounts();
  }, [fetchTreeAccounts]);
 
  return {
    treeAccounts: treeAccounts,
    refreshTreeAccounts: () => {
      setTreeAccounts(null);
    },
  } as const;
}

export default useTreeAccount;
