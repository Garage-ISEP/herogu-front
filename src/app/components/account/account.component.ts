import { ProgressService } from './../../services/progress.service';
import { TextDialogComponent } from './../utils/text-dialog/text-dialog.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(
    private readonly _api: ApiService,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _snackbar: SnackbarService,
  ) { }

  public logout() {
    this._dialog.open(TextDialogComponent, { data: "Es-tu sûr de te déconnecter ?" }).afterClosed().subscribe((e: string) => {
      if (e) {
        if (this._api.logout()) {
          this._router.navigateByUrl("/auth");
          this._snackbar.snack("Tu as été déconnecté avec succès !");
        } else
          this._snackbar.snack("Une erreur est apparue lors de ta déconnexion");
      }
    });
  }

  public get user() {
    return this._api.user;
  }
 }
