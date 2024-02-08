import { useMemo } from 'react';
import axios from 'axios';
import useToken from './useToken';
import type { UserToken } from './useToken';

export default function useApi() {
  const { token: userToken } = useToken() as { token: UserToken | undefined };

  const api = useMemo(() => {
    return axios.create({
      baseURL: 'https://helping-tick-creative.ngrok-free.app/api/v1',
      headers: {
        Authorization: `Token ${userToken?.token as string}`,
      },
    });
  }, [userToken]);

  return api;
}
