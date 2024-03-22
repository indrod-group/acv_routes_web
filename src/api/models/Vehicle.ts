import { Device } from "./Device";
import { VehicleType } from "./VehicleType";

/**
 * A type that represents a vehicle with its unique identifier, type, device, color, chassis, tonnage, plate, and vin.
 * @param vuid The unique identifier of the vehicle.
 * @param vehicle_type The type of the vehicle, which includes its year, brand, model, version, fuel type, and fuel consumption.
 * @param device The device that is attached to the vehicle for tracking purposes, which has an IMEI number, or null if the vehicle has no device.
 * @param color The color of the vehicle.
 * @param chassis The chassis number of the vehicle.
 * @param tonnage The tonnage of the vehicle, which indicates its weight capacity.
 * @param plate The plate number of the vehicle, or undefined if the vehicle has no plate.
 * @param vin The vehicle identification number of the vehicle, or undefined if the vehicle has no vin.
 * @example
 * const vehicle: Vehicle = {
 *   vuid: "123456789",
 *   vehicle_type: {
 *     year: 2020,
 *     brand: "Toyota",
 *     model: "Corolla",
 *     version: "Hybrid",
 *     fuel_type: "Gasoline/Electric",
 *     city_mileage: "4.5",
 *     highway_mileage: "5.0",
 *     mixed_mileage: "4.7"
 *   },
 *   device: {
 *     imei: "987654321"
 *   },
 *   color: "Red",
 *   chassis: "ABCDEF",
 *   tonnage: "1.5",
 *   plate: "XYZ-123",
 *   vin: "GHIJKL"
 * };
 * @see https://example.com/api/vehicles/ for the API that returns this type.
 */
export type Vehicle = {
    vuid:         string;
    vehicle_type: VehicleType;
    device:       Device | null;
    color:        string;
    chassis:      string;
    tonnage:      string;
    plate?:       string;
    vin?:         string;
}

