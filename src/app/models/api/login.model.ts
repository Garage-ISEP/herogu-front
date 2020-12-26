export interface LoginRequestModel {
  password: string;
  student_id: string;
}
export interface LoginResponseModel {
  status: string;
  token: string;
}

export interface RegisterRequestModel {
  password: string;
  student_id: string;
  email: string;
}
