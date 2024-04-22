import React, { useState, createContext, ReactNode } from 'react';
import { Vehicle } from '../../../api/models';

interface VehicleContextProps {
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}

const VehicleContext = createContext<VehicleContextProps>({
    selectedVehicle: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedVehicle: () => {}
});

interface VehicleProviderProps {
  children: ReactNode;
}

const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  return (
    <VehicleContext.Provider value={{ selectedVehicle, setSelectedVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
