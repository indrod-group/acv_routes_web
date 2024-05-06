import type { UserProfile } from "./models/UserProfile";
import type { Alarm } from "./models/Alarm";
import type { Device } from "./models/Device";
import { Route } from "./models/Route";
import { Advertisement, Manual, Vehicle } from "./models";

/**
 * A utility class that provides methods to convert between JSON strings and TypeScript objects.
 */
export class Convert {
  /**
   * Converts a JSON string to a UserProfile object.
   * @param json - The JSON string to convert.
   * @returns The first UserProfile object from the parsed JSON string.
   */
  public static toUserProfile(json: string): UserProfile {
    const userData: UserProfile[] = JSON.parse(json) as UserProfile[] || undefined;
    return userData[0];
  }

  /**
   * Converts a UserProfile object to a JSON string.
   * @param value - The UserProfile object to convert.
   * @returns The JSON string representation of the UserProfile object.
   */
  public static userProfileToJson(value: UserProfile): string {
    return JSON.stringify(value);
  }

  /**
   * Converts a JSON string to an array of Alarm objects.
   * @param json - The JSON string to convert.
   * @returns The array of Alarm objects from the parsed JSON string.
   */
  public static toAlarms(json: string): Alarm[] {
    return JSON.parse(json) as Alarm[];
  }

  /**
   * Converts an array of Alarm objects to a JSON string.
   * @param value - The array of Alarm objects to convert.
   * @returns The JSON string representation of the array of Alarm objects.
   */
  public static alarmsToJson(value: Alarm[]): string {
    return JSON.stringify(value);
  }

  /**
   * Converts a JSON string to an array of Device objects.
   * @param json - The JSON string to convert.
   * @returns The array of Device objects from the parsed JSON string.
   */
  public static toDevices(json: string): Device[] {
    return JSON.parse(json) as Device[];
  }

  /**
   * Converts an array of Device objects to a JSON string.
   * @param value - The array of Device objects to convert.
   * @returns The JSON string representation of the array of Device objects.
   */
  public static devicesToJson(value: Device[]): string {
    return JSON.stringify(value);
  }

  /**
   * Converts a JSON string to an array of Route objects.
   * @param json - The JSON string to convert.
   * @returns The array of Route objects from the parsed JSON string.
   */
  public static toRoutes(json: string): Route[] {
    return JSON.parse(json) as Route[];
  }

  /**
   * Converts an array of Route objects to a JSON string.
   * @param value - The array of Route objects to convert.
   * @returns The JSON string representation of the array of Route objects.
   */
  public static routesToJson(value: Route[]): string {
    return JSON.stringify(value);
  }

  /**
   * Converts a JSON string to an array of Vehicles objects.
   * @param json - The JSON string to convert.
   * @returns The array of Route objects from the parsed JSON string.
   */
  public static toVehicles(json: string): Vehicle[] {
    return JSON.parse(json) as Vehicle[];
  }

  public static toManual(json: string): Manual[] {
    return JSON.parse(json) as Manual[];
  }

  public static manualToJson(value: Manual[]): string {
    return JSON.stringify(value);
  }

  public static toAdvertisement(json: string): Advertisement[] {
    return JSON.parse(json) as Advertisement[];
  }

  public static advertisementToJson(value: Advertisement[]): string {
    return JSON.stringify(value);
  }

}
