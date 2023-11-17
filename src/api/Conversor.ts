import type { UserProfile } from "./models/UserProfile";

export class Convert {
  public static toUserProfile(json: string): UserProfile {
    const userData: UserProfile[] = JSON.parse(json) as UserProfile[] || undefined;
    return userData[0];
  }

  public static userProfileToJson(value: UserProfile): string {
    return JSON.stringify(value);
  }
}
