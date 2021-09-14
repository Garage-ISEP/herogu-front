import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ProgressService } from "../services/progress.service";

export abstract class BaseApi {
  constructor(
    protected readonly http: HttpClient,
    protected readonly progress: ProgressService,
    protected readonly router: Router,
  ) { }

  protected async get<R>(path: string, captcha?: string) {
    this.progress.toggle();
    try {
      if (path.startsWith("/"))
        path = path.substring(1);
      const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}`, recaptcha: captcha || '' });
      return await this.http.get<R>(`${environment.api}/${path}`, { headers }).toPromise();
    } finally {
      this.progress.toggle();
    }
  }

  protected post<Q, R>(path: string, body: Q, observe: true): Observable<HttpEvent<R>>;
  protected post<Q, R>(path: string, body: Q, observe: false): Promise<R>;
  protected post<Q, R>(path: string, body: Q, captcha: string): Promise<R>;
  protected post<Q, R>(path: string, body: Q): Promise<R>;
  protected post<Q, R>(path: string): Promise<R>;
  protected post<Q, R>(path: string, body?: Q, observe_captcha: string | boolean = false) {
    this.progress.toggle();
    try {
      if (path.startsWith("/"))
        path = path.substring(1);
      const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}`, recaptcha: typeof observe_captcha === 'string' ? observe_captcha : '' });
      if (typeof observe_captcha === 'boolean' && observe_captcha)
        return this.http.post<R>(`${environment.api}/${path}`, body, { reportProgress: true, observe: 'events', headers })
      else
        return this.http.post<R>(`${environment.api}/${path}`, body, { headers }).toPromise();
    } finally {
      this.progress.toggle();
    }
  }

  protected async patch<Q, R>(path: string, body?: Q, captcha?: string) {
    this.progress.toggle();
    try {
      if (path.startsWith("/"))
        path = path.substring(1);
      const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}`, recaptcha: captcha || '' });
      return this.http.patch<R>(`${environment.api}/${path}`, body, { headers }).toPromise();
    } finally {
      this.progress.toggle();
    }
  }

  public async logout() {
    this.token = null;
    this.router.navigateByUrl("/auth");
  }

  protected get token() {
    return localStorage.getItem("token");
  }

  protected set token(val: string | null) {
    if (val)
      localStorage.setItem("token", val);
    else
      localStorage.removeItem("token");
  }

  public get logged() {
    return this.token != null;
  }
}