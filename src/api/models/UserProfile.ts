export type UserProfile = {
  uuid: string;
  email: string;
  first_name: string;
  last_name: null| string;
  is_active: boolean;
  is_staff: boolean;
  id_card: null| string;
  roles: string[];
  parent_accounts: string[];
  birth_date: string | null;
  marital_status: string;
  education_level: string;
  home_address: null | string;
  photo: null | string;
  child_accounts: null | UserProfile[];
}
