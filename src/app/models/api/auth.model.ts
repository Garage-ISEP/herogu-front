import { User } from "./user.model";

export interface LoginRequestModel {
  password: string;
  studentId: string;
}
export interface LoginResponseModel {
  token: string;
  user: User;
}

export interface AuthErrorModel {
  reason: "admin" | "promotion";
  message: string;
}