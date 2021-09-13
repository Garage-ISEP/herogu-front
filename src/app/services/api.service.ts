import { ProgressService } from './progress.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { UserModel } from './../models/user.model';
import { LoginResponseModel, RegisterRequestModel } from './../models/api/login.model';
import { LoginRequestModel } from '../models/api/login.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BaseApi } from '../utils/base-api.util';
@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApi {

  public userData: UserModel;

  constructor(
    http: HttpClient,
    private readonly progress: ProgressService,
    private readonly snackbar: MatSnackBar
  ) {
    super(http);
  }

  public async login(body: LoginRequestModel): Promise<"bad_password"|"bad_id"|"error"|"success"> {
    try {
      const data = await this.http.post<LoginResponseModel>(environment.api + "/auth/login", body).toPromise();
      if (data?.httpCode >= 300 || !data.token) {
        if (data?.httpCode === 400)
          return "bad_id"
        else if (data?.httpCode === 401)
          return "bad_password"
        else
          return "error";
      }
      localStorage.setItem("token", data.token);
      this.token = data.token;
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        console.log(e.status, e.statusText);
        switch (e.status) {
          case 400:
            return "bad_id";
          case 401:
            return "bad_password";
          default:
            return "error";
        }
      }
    }
    return "success";
  }

  public async register(body: RegisterRequestModel): Promise<"sucess"|"error"|"bad_request"> {
    try {
      await this.post<RegisterRequestModel, void>("/users", body, false);
    } catch (e) {
      console.error(e);
      const error: HttpErrorResponse = e;
      if (error.status == 400)
        return "bad_request";
      else
        return "error";
    }
  }

  public async loadUserData(force = false): Promise<UserModel> {
    if (this.userData && !force)
      return this.userData;
    try {
      this.progress.toggle("indeterminate");
      this.userData = await this.get<UserModel>(`/me`);
      this.progress.toggle("indeterminate");
      return this.userData;
    } catch (e) {
      console.error(e);
      this.progress.toggle("indeterminate");
    }
  }

  public snack(text: string, duration?: number, buttonText?: string): MatSnackBarRef<any>  {
    return this.snackbar.open(text, buttonText, duration ? { duration } : null);
  }
}
