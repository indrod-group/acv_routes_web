import { useState } from 'react';

export type UserToken = {
  token: string;
}

function saveToLocalStorage(key: string, value: string) {
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
    const userToken = getFromLocalStorage<UserToken>(tokenKey);
    return userToken;
  };

  const [token, setToken] = useState<UserToken | undefined>(getToken());

  const saveToken = (userToken: UserToken) => {
    saveToLocalStorage(tokenKey, userToken?.token);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}
