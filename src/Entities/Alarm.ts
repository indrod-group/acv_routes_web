import { AlarmCode } from "./AlarmCodes";

/**
 * Type for an alarm.
 * @property {number} id - The ID of the alarm.
 * @property {string} device_imei - The IMEI of the device that triggered the alarm.
 * @property {null | string} lat - The latitude where the alarm was triggered.
 * @property {null | string} lng - The longitude where the alarm was triggered.
 * @property {number} time - The time when the alarm was triggered.
 * @property {keyof typeof AlarmCode} alarm_code - The code of the alarm.
 * @property {number} alarm_type - The type of the alarm.
 * @property {string | null} address - The address where the alarm was triggered.
 * @property {number | null} course - The course of the device when the alarm was triggered.
 * @property {number} device_type - The type of device that triggered the alarm.
 * @property {null | string} position_type - The type of position where the alarm was triggered.
 * @property {number | null} speed - The speed of the device when the alarm was triggered.
 */
export type Alarm = {
  id: number;
  device_imei: string;
  lat: null | string;
  lng: null | string;
  time: number;
  alarm_code: keyof typeof AlarmCode;
  alarm_type: number;
  address: string | null;
  course: number | null;
  device_type: number;
  position_type: null | string;
  speed: number | null;
}
