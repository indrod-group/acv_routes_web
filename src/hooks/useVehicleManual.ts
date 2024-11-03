import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';

import { Convert } from '../helpers/Conversor';
import useApi from './useApi';
import { useVehicleContext } from '../pages/Dashboard/Vehicles/useVehicleContext';
import { Manual } from '../Entities';

/**
 * A React hook that provides a vehicle's maintenance manual.
 * @returns An object containing the manual and a function to fetch the manual.
 */
function useVehicleManual(): { manual: Manual | null, getManual: () => void } {
  // Use the custom useApi hook to get the API instance.
  const api = useApi();
  // The state for storing the fetched manual.
  const [manual, setManual] = useState<Manual | null>(null);
  // Use the custom useVehicleContext hook to get the selected vehicle.
  const {selectedVehicle} = useVehicleContext();

  /**
   * Fetches the maintenance manual for the selected vehicle.
   */
  const fetchVehicleManual = useCallback(() => {
    if (selectedVehicle != undefined || selectedVehicle != null) {
      api.get(`/vehicles/${selectedVehicle.vehicle_type.brand}/${selectedVehicle.vehicle_type.model}/${selectedVehicle.vehicle_type.year}/manuals/`)
        .then(response => {
          // Convert the response data to Manual objects.
          const manuals = Convert.toManual(JSON.stringify(response.data));
          // Set the first manual as the state.
          setManual(manuals[0]);
          // Show a success message.
          void message.info('Se ha obtenido el manual de mantenimiento correctamente.');
        })
        .catch(error => {
          // Log the error and show an error message.
          console.error('Error fetching manual: ', error);
          void message.error('Ha habido un problema obteniendo el manual de mantenimiento.');
        });
    }
  }, [api, selectedVehicle]);

  // Fetch the manual when the component mounts or when the selected vehicle changes.
  useEffect(() => {
    fetchVehicleManual();
  }, [fetchVehicleManual]);

  // Return the manual and the fetch function.
  return {
    manual: manual,
    getManual: fetchVehicleManual,
  } as const;
}

export default useVehicleManual;
