export interface AuthConnexionModel {
  code: string;
  password: string;
}
export interface AuthRegisterModel {
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
}
