import { LoginResponseModel, RegisterRequestModel } from './../models/api/login.model';
import { LoginRequestModel } from '../models/api/login.model';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  private _token: string;
  private readonly rootUrl = environment.apiUrl

  constructor(
    private readonly _http: HttpClient
  ) { }

  public ngOnInit() {
    this._token = localStorage.getItem("token");
  }

  get logged(): boolean {
    return this._token?.length > 0;
  }

  public async login(body: LoginRequestModel): Promise<"bad_password"|"bad_id"|"error"> {
    try {
      const data = await this.postRequest<LoginRequestModel, LoginResponseModel>("/auth/login", body);
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
  }
  public async register(body: RegisterRequestModel): Promise<"sucess"|"error"> {
    try {
      await this.postRequest<RegisterRequestModel, void>("/auth/register", body);
      return "sucess";
    } catch (e) {
      console.error(e);
      return "error";
    }
  }

  public async getRequest<R>(path: string): Promise<R> {
    return await this._http.get<R>(path, {
      headers: {
        "auth": this._token,
        "Content-Type": "application/json"
      }
    }).toPromise();
  }

  public async postRequest<Q, R>(path: string, body: Q): Promise<R> {
    return await this._http.post<R>(path, body, {
      headers: {
        "auth": this._token,
        "Content-Type": "application/json"
      }
    }).toPromise();
  }

  public async patchRequest<Q, R>(path: string, body: Q): Promise<R> {
    return await this._http.patch<R>(path, body, {
      headers: {
        "auth": this._token,
        "Content-Type": "application/json"
      }
    }).toPromise();
  }
}
