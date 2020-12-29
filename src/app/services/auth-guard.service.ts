import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private _apiService: ApiService, private _router: Router) {}

  canActivate(): boolean {
    if (!this._apiService.logged) {
      this._router.navigateByUrl('/auth');
      return false;
    } else return true;
  }
}
