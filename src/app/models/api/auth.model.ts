import { User } from "./user.model";

export interface LoginRequestModel {
  password: string;
  student_id: string;
}
export interface LoginResponseModel {
  token: string;
  user: User;
}

export interface RegisterRequestModel {
  password: string;
  student_id: string;
  email: string;
  captchaToken: string;
}
