export interface AuthConnexionModel {
  code: string;
  password: string;
}
export interface AuthRegisterModel {
  code: string | boolean;
  email: string | boolean;
  password: string | boolean;
  confirmPassword: string | boolean;
}
