import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import useApi from './useApi';
import { useVehicleContext } from '../../modules/Dashboard/Vehicles/useVehicleContext';

/**
 * A React hook that provides a vehicle's maintenance manual.
 * @returns An object containing the manual and a function to fetch the manual.
 */
function useBrokerInfo(): { brokerInfo: any, getBrokerInfo: () => void } {
    // Use the custom useApi hook to get the API instance.
    const api = useApi();
    // The state for storing the fetched manual.
    const [broker, setBrokerInfo] = useState<any | null>(null);
    // Use the custom useVehicleContext hook to get the selected vehicle.
    const { selectedVehicle } = useVehicleContext();

    /**
     * Fetches the maintenance manual for the selected vehicle.
     */
    const fetchBrokerInfo = useCallback(() => {
        if (selectedVehicle != undefined || selectedVehicle != null) {
            api.get(`/vehicles/${selectedVehicle.vuid}/brokerinfo`)
                .then(response => {
                    // Convert the response data to Manual objects.
                    // const data = Convert.toManual(JSON.stringify(response.data));
                    // Set the first manual as the state.
                    setBrokerInfo(response.data);
                    // Show a success message.
                    // void message.info('Se ha obtenido el manual de mantenimiento correctamente.');
                })
                .catch(error => {
                    // Log the error and show an error message.
                    console.error('Error fetching manual: ', error);
                    void message.error('Ha habido un problema obteniendo la información del broker.');
                });
        }
    }, [api, selectedVehicle]);

    // Fetch the manual when the component mounts or when the selected vehicle changes.
    useEffect(() => {
        fetchBrokerInfo();
    }, [fetchBrokerInfo]);

    // Return the manual and the fetch function.
    return {
        brokerInfo: broker,
        getBrokerInfo: fetchBrokerInfo,
    } as const;
}

export default useBrokerInfo;
