export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  mail: string;
  studentId: string;
  verified: boolean;
}

export interface UpdatePasswordModel {
  new_password: string;
  old_password: string;
  confirm_password: string;
}
