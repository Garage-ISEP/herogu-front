import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { UserModel } from './../models/user.model';
import { LoginResponseModel, RegisterRequestModel } from './../models/api/login.model';
import { LoginRequestModel } from '../models/api/login.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = localStorage.getItem("token");
  public userData: Partial<UserModel> = localStorage.getItem("student_id") ? {studentId: localStorage.getItem("student_id")} : undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly snackbar: MatSnackBar
  ) { }


  get logged(): boolean {
    return this.token?.length > 0;
  }

  public async login(body: LoginRequestModel): Promise<"bad_password"|"bad_id"|"error"|"success"> {
    try {
      const data = await this.http.post<LoginResponseModel>(environment.apiUrl + "/auth/login", body).toPromise();
      console.log(data);
      if (!data.token)
        return "error";
      localStorage.setItem("token", data.token);
      localStorage.setItem("student_id", body.student_id);
      this.token = data.token;
      this.userData ??= { studentId: body.student_id };
    } catch (e) {
      const error: HttpErrorResponse = e;
      console.log(error.status, error.statusText);
      switch (error.status) {
        case 400:
          return "bad_id";
        case 401:
          return "bad_password";
        default:
          return "error";
      }
    }
    return "success";
  }

  public logout(): boolean {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("student_id");
      this.token = this.userData = undefined;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async register(body: RegisterRequestModel): Promise<"sucess"|"error"|"bad_request"> {
    try {
      await this.postRequest<RegisterRequestModel, void>("/users", body, false);
    } catch (e) {
      console.error(e);
      const error: HttpErrorResponse = e;
      if (error.status == 400)
        return "bad_request";
      else
        return "error";
    }
  }

  public async loadUserData(): Promise<UserModel> {
    if (!this.userData.studentId)
      return;
    try {
      this.userData = await this.getRequest<UserModel>(`/users/${this.userData.studentId}`);
      return this.userData as UserModel;
    } catch (e) {
      console.error(e);
    }
  }

  public async getRequest<R>(path: string): Promise<R> {
    return await this.http.get<R>(environment.apiUrl + path, {
      headers: {
        "auth": this.token,
        "Content-Type": "application/json"
      }
    }).toPromise();
  }

  public async postRequest<Q, R>(path: string, body: Q, protec = true): Promise<R> {
    return await this.http.post<R>(environment.apiUrl + path, body, {
      headers: protec ? {
        "auth": this.token,
        "Content-Type": "application/json"
      } : { "Content-Type": "application/json" }
    }).toPromise();
  }

  public async patchRequest<Q, R>(path: string, body: Q, protec = true): Promise<R> {
    return await this.http.patch<R>(path, body, {
      headers: protec ? {
        "auth": this.token,
        "Content-Type": "application/json"
      } : { "Content-Type": "application/json" }
    }).toPromise();
  }

  public snack(text: string, duration?: number, buttonText?: string): MatSnackBarRef<any>  {
    return this.snackbar.open(text, buttonText, duration ? { duration } : null);
  }
}
