import { ProgressService } from './../../services/progress.service';
import { AccountModel } from './../../models/api/account.model';
import { TextDialogComponent } from './../utils/text-dialog/text-dialog.component';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePasswordModel } from 'src/app/models/user.model';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { PasswordDialogComponent } from '../utils/password-dialog/password-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public loading = true;
  public data: AccountModel;
  public dataUpdate: { [K in keyof AccountModel]: boolean } = { last_name: false, first_name: false };
  public snackbar: MatSnackBarRef<any>;
  public error: boolean = false;

  constructor(
    public api: ApiService,
    private router: Router,
    private progress: ProgressService,
    private dialog: MatDialog
  ) { }

  public async ngOnInit() {
    if (!this.api.userData) {
      if (!await this.api.loadUserData())
        this.error = true;
    }
    this.loading = false;
  }

  public logout() {
    this.dialog.open(TextDialogComponent, { data: "Es-tu sûr de te déconnecter ?" }).afterClosed().subscribe((e: string) => {
      if (e) {
        if (this.api.logout()) {
          this.router.navigateByUrl("/auth");
          this.api.snack("Tu as été déconnecté avec succès !", 4000);
        } else
          this.api.snack("Une erreur est apparue lors de ta déconnexion", 4000);
      }
    });
  }

  public updatePassword() {
    this.dialog.open(PasswordDialogComponent).afterClosed().subscribe((e: UpdatePasswordModel) => {
      if (e) {
        //TODO: Make New Password request
        // this.api.postRequest<>()
      }
    })
  }

  public async resendEmailConfirmation() {
    console.log(this.api.userData.last_mail);
    const lastTime = (await this.api.loadUserData(true))?.last_mail - Date.now();
    if (lastTime > 0) {
      this.api.snack(`Tu dois encore attendre ${new Date(lastTime).getMinutes()} minutes pour renvoyer un mail !`, 3000);
    }
    try {
      this.progress.toggle();
      await this.api.postRequest("/users/resend", {});
      this.api.snack(`Une email de confirmation a été réenvoyé à l'adresse ${this.api.userData.mail}`, 3000);
    } catch (e) {
      this.api.snack("Une erreur est apparue lors du renvoi du mail !", 3000);
    } finally {
      this.progress.toggle();
    }
  }
}
