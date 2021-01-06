import { ApiService } from './../../services/api.service';
import { AuthRegisterModel } from './../../models/auth.model';
import { Component, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptchaV3Service } from 'ng-recaptcha';
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
    email: '',
    captcha: ''
  };
  public submitStatus: "cannot" | "loading" | "can" = "cannot";
  public succeed: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly _apiService: ApiService,
    private readonly _snackBar: MatSnackBar,
    private readonly _recaptchaService: ReCaptchaV3Service,
  ) { }


  public async submitAuth() {
    if (this.connexionData.password != this.connexionData.confirmPassword) {
      this.submitStatus = "cannot";
      this._snackBar.open("Les mots de passes ne concordent pas !", null, { duration: 4000 });
      return;
    }
    this.submitStatus = "loading";
    this._recaptchaService.execute("submit").subscribe(async token => {
      const res = await this._apiService.register({
        email: this.connexionData.email,
        password: this.connexionData.password,
        student_id: this.connexionData.code,
        captchaToken: token
      });
      switch (res) {
        case "bad_request":
          this._snackBar.open("Ce code élève correspond déjà à un compte, essayez de vous connecter", null, { duration: 4000 });
          break;
        case "error":
          this._snackBar.open("Erreur serveur lors de la création du compte !", null, { duration: 4000 });
          break;
        case "sucess":
          localStorage.setItem("email_validation", "true");
          this.succeed.emit();
          break;
      }
      this.submitStatus = "can";
    });
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
