export type UserProfile = {
  uuid: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  id_card: string | null;
  roles: string[];
  parent_accounts: string[];
  child_accounts: UserProfile[] | null;
}
