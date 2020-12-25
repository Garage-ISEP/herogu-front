import { ApiService } from './../../services/api.service';
import { AuthRegisterModel } from './../../models/auth.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public connexionData: AuthRegisterModel = {
    code: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  public submitStatus: "cannot" | "loading" | "can" = "cannot";

  constructor(
    private readonly _apiService: ApiService,
    private readonly _snackBar: MatSnackBar
  ) { }


  public submitAuth() {
    if (this.connexionData.password != this.connexionData.confirmPassword) {
      this.submitStatus = "cannot";
      this._snackBar.open("Les mots de passes ne concordent pas !", null, { duration: 4000 });
      return;
    }
    this.submitStatus = "loading";
    this._apiService
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
