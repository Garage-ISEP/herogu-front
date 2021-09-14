import { ProgressService } from './progress.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { User } from '../models/api/user.model';
import { LoginResponseModel, RegisterRequestModel } from '../models/api/auth.model';
import { LoginRequestModel } from '../models/api/auth.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BaseApi } from '../utils/base-api.util';
import { SnackbarService } from './snackbar.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApi {

  public user?: User;

  constructor(http: HttpClient, progress: ProgressService) {
    super(http, progress);
  }

  public async login(body: LoginRequestModel) {
    try {
      this.progress.toggle();
      const res = await this.http.post<LoginResponseModel>(environment.api + "/auth/login", body).toPromise();
      this.token = res.token;
      return this.user = res.user;
    } finally {
      this.progress.toggle();
    }
  }

  public async loadUser(): Promise<User | undefined> {
    if (this.user) return this.user;
    try {
      return this.user = await this.get<User>(`/auth/me`);
    } catch (e) {
      console.error(e);
    }
  }
}
