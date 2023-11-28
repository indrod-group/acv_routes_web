/**
 * Type for a device.
 * @property {string} imei - The device's International Mobile Equipment Identity (IMEI) number.
 * @property {string} user_name - The name of the user associated with the device.
 * @property {string | null} car_owner - The name of the car owner. This field can be left blank.
 * @property {string | null} license_number - The license number of the car. This field can be left blank.
 * @property {string | null} vin - The Vehicle Identification Number (VIN) of the car. This field can be left blank.
 * @property {boolean} is_tracking_alarms - A flag indicating if the device is tracking alarms.
 */
export type Device = {
  [key: string]: string | null | boolean;
  imei: string;
  user_name: string;
  car_owner: string | null;
  license_number: string | null;
  vin: string | null;
  is_tracking_alarms: boolean;
}
