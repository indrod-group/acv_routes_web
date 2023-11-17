import { useState } from 'react';

export type UserToken = {
  token: string;
}

function saveToLocalStorage(key: string, value: UserToken) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage<T>(key: string): T | undefined {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }
  return undefined;
}

export default function useToken() {
  const tokenKey = 'token';

  const getToken = (): UserToken | undefined => {
    return getFromLocalStorage<UserToken>(tokenKey);
  };

  const [token, setToken] = useState<UserToken | undefined>(getToken());

  const saveToken = (userToken: UserToken) => {
    saveToLocalStorage(tokenKey, userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}
