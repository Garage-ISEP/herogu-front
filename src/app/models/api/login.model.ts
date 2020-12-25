export interface LoginRequestModel {
  password: string;
  student_id: string;
}
export interface LoginResponseModel {
  status: string;
  token: string;
}
