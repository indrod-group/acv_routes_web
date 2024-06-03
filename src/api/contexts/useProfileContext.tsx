import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useProfile } from '../hooks';
import { UserProfile } from '../models';

// Definir el tipo para el contexto
type ProfileContextType = {
  user: UserProfile | null;
};

// Crear el contexto
export const ProfileContext = createContext<ProfileContextType>({
  user: null
});

interface ProfileProviderProps {
  children: ReactNode;
}

// Crear el proveedor
export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { userProfile } = useProfile();
  const [user] = useState<UserProfile | null>(userProfile);

  return (
    <ProfileContext.Provider value={{ user }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Crear el hook personalizado
export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error('useProfileContext debe ser usado dentro de un ProfileProvider');
  }

  return context;
};