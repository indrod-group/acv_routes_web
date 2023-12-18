import { useState, useEffect } from 'react';
import { message } from 'antd';

import { Convert } from '../Conversor';
import { Route } from '../models/Route';
import useProfile from './useProfile';
import type { UserProfile } from '../models/UserProfile';
import useApi from './useApi';

/**
 * useRoutePositions hook
 * 
 * This hook is used to fetch and handle the route positions associated with a specific user profile.
 * 
 * @returns {Object} The state and functions of the hook.
 * @returns {Route[] | undefined} .routePositions - The fetched route positions.
 * @returns {() => void} .refreshRoutePositions - The function to refresh the route positions.
 */
export function useRoutePositions(): { routePositions: Route[] | undefined, refreshRoutePositions: () => void } {
  const [routePositions, setRoutePositions] = useState<Route[]>();
  const { userProfile } = useProfile() as { userProfile: UserProfile };
  const api = useApi();

  useEffect(() => {
    if (!userProfile?.uuid) {
      console.error('No user profile UUID found');
      return;
    }
    api.get(`/user-routes/${userProfile.uuid}/`)
      .then(response => {
        setRoutePositions(Convert.toRoutes(JSON.stringify(response.data)));
        void message.info("Las rutas y sus posiciones se han obtenido correctamente.");
      })
      .catch(error => {
        console.error(error);
        void message.error("Ha habido un error obteniendo las rutas y sus posiciones.");
      });
  }, [api, userProfile]);
 
  return {
    routePositions,
    refreshRoutePositions: () => setRoutePositions(undefined),
  };
}
