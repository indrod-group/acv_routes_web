/**
 * A type that represents a vehicle with its basic information and fuel consumption.
 * @param year The year of manufacture of the vehicle.
 * @param brand The brand name of the vehicle.
 * @param model The model name of the vehicle.
 * @param version The version or trim level of the vehicle, or null if not applicable.
 * @param fuel_type The type of fuel that the vehicle uses, such as gasoline, diesel, electric, etc.
 * @param city_mileage The fuel consumption of the vehicle in liters per 100 kilometers when driving in the city.
 * @param highway_mileage The fuel consumption of the vehicle in liters per 100 kilometers when driving on the highway.
 * @param mixed_mileage The fuel consumption of the vehicle in liters per 100 kilometers when driving in mixed conditions.
 * @example
 * const vehicle: VehicleType = {
 *   year: 2020,
 *   brand: "Toyota",
 *   model: "Corolla",
 *   version: "Hybrid",
 *   fuel_type: "Gasoline/Electric",
 *   city_mileage: "4.5",
 *   highway_mileage: "5.0",
 *   mixed_mileage: "4.7"
 * };
 * @see https://www.toyota.com/corolla/ for more information about the vehicle model.
 * @see https://example.com/api/vehicles/ for the API that returns this type.
 */
export type VehicleType = {
    year:            number;
    brand:           string;
    model:           string;
    version:         string | null;
    fuel_type:       string;
    city_mileage:    string;
    highway_mileage: string;
    mixed_mileage:   string;
}
