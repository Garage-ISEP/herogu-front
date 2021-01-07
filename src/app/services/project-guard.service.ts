import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuardService implements CanActivate {

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.api.userData?.verified) {
      return true;
    } else {
      this.router.navigateByUrl("/account");
      return false;
    }
  }
}
