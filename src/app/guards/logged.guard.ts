import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(
    private readonly _api: ApiService,
    private readonly _router: Router,
  ) { }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !this._api.logged ? this._router.createUrlTree(["auth"]) : true;
  }
  
}
