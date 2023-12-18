import { useState, useEffect } from 'react';
import useToken from './useToken';
import { Convert } from '../Conversor';
import { Route } from '../models/Route';
import axios from 'axios';
import { message } from 'antd';

import useProfile from './useProfile';
import type { UserProfile } from '../models/UserProfile';

export function useRoutePositions() {
  const { token } = useToken();
  const { userProfile } = useProfile() as { userProfile: UserProfile };

  const [routePositions, setRoutePositions] = useState<Route[]>();

  useEffect(() => {
    if (!userProfile?.uuid) {
      console.error('No user profile UUID found');
      return;
    }
    axios.get(`https://twlxb59c-9090.use2.devtunnels.ms/api/v1/user-routes/${userProfile.uuid}/`, {
      headers: {
        Authorization: `Token ${token?.token as string}`,
      },
    })
      .then(response => {
        setRoutePositions(Convert.toRoutes(JSON.stringify(response.data)));
      })
      .catch(error => {
        void message.error("No se han podido mostrar las rutas y sus posiciones");
        console.error(error);
      });
  }, [token, userProfile]);

  return {
    routePositions,
    refreshRoutePositions: () => setRoutePositions(undefined),
  };
}
