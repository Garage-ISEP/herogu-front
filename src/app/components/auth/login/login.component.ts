import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AuthConnexionModel } from 'src/app/models/auth.model';
import { ApiService } from 'src/app/services/api.service';
import { ɵangular_packages_platform_browser_platform_browser_j } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  public connexionData: AuthConnexionModel = {
    code: '',
    password: ''
  };
  public submitStatus: "cannot" | "loading" | "can" = "cannot";

  constructor(
    private readonly _apiService: ApiService,
    private readonly _snackbar: MatSnackBar,
    private readonly _router: Router
  ) { }

  public async submitAuth() {
    this.submitStatus = "loading";
    const res = await this._apiService.login({ password: this.connexionData.password, student_id: this.connexionData.code });
    switch (res) {
      case "success":
        this._router.navigateByUrl("/");
        this._snackbar.open("Vous êtes connecté avec succès !", null, { duration: 3000 });
        break;
      case "bad_id":
        this._snackbar.open("Identifiant élève inconnu", null, { duration: 3000 });
        break;
      case "bad_password":
        this._snackbar.open("Mot de passe éronné", null, { duration: 3000 });
        break;
      case "error":
        this._snackbar.open("Erreur inconnue", null, { duration: 3000 });
        break;
    }
    this.submitStatus = "can";
  }
  public checkForm(form: HTMLFormElement) {
    if (this.submitStatus == "loading")
      return;
    if (!form.checkValidity())
      this.submitStatus = "cannot";
    else
      this.submitStatus = "can";
  }

}
