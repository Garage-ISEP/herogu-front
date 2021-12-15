import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {

  constructor(
    private readonly _api: ApiService,
    private readonly _router: Router,
    private readonly _snackbar: SnackbarService,
  ) { }
  
  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this._api.user)
      await this._api.loadUser();
    if (this._api.user?.projects.find(project => project.id === route.params.id)) {
      return true;
    } else {
      this._snackbar.snack("Impossible de charger le projet");
      return this._router.createUrlTree(["/"]);
    }
  }

}
