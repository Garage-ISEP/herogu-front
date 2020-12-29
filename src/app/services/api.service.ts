import { LoginResponseModel, RegisterRequestModel } from './../models/api/login.model';
import { LoginRequestModel } from '../models/api/login.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _token: string = localStorage.getItem("token");

  constructor(
    private readonly _http: HttpClient
  ) { }

  get logged(): boolean {
    return this._token?.length > 0;
  }

  public async login(body: LoginRequestModel): Promise<"bad_password"|"bad_id"|"error"|"success"> {
    try {
      const data = await this._http.post<LoginResponseModel>(environment.apiUrl + "/auth/login", body).toPromise();
      console.log(data);
      if (!data.token)
        return "error";
      localStorage.setItem("token", data.token);
      this._token = data.token;
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

  public async getRequest<R>(path: string): Promise<R> {
    return await this._http.get<R>(environment.apiUrl + path, {
      headers: {
        "auth": this._token,
        "Content-Type": "application/json"
      }
    }).toPromise();
  }

  public async postRequest<Q, R>(path: string, body: Q, protec = true): Promise<R> {
    return await this._http.post<R>(environment.apiUrl + path, body, {
      headers: protec ? {
        "auth": this._token,
        "Content-Type": "application/json"
      } : { "Content-Type": "application/json" }
    }).toPromise();
  }

  public async patchRequest<Q, R>(path: string, body: Q, protec = true): Promise<R> {
    return await this._http.patch<R>(path, body, {
      headers: protec ? {
        "auth": this._token,
        "Content-Type": "application/json"
      } : { "Content-Type": "application/json" }
    }).toPromise();
  }
}
