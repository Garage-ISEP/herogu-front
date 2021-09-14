import { SnackbarService } from './../../services/snackbar.service';
import { ApiService } from './../../services/api.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public readonly connexionForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    studentId: new FormControl('', [Validators.required, Validators.pattern(/^\w{4}\d{5}$/g)])
  });
  public submitting = false;

  constructor(
    private readonly _api: ApiService,
    private readonly _snackbar: SnackbarService,
    private readonly _router: Router
  ) { }

  public async submitAuth() {
    this.submitting = true;
    try {
      const res = await this._api.login({ ...this.connexionForm.value });
      this._router.navigateByUrl("/");
      this._snackbar.snack(`Bienvenue ${res.firstName} !`);
    } catch (e) {
      if (e instanceof HttpErrorResponse && (e.status === 401 || e.status === 400))
        this._snackbar.snack("Ton identifiant ou mot de passe est incorrect.");
      else
        this._snackbar.snack("Une erreur est survenue.");
      this._api.logout();
    } finally {
      this.submitting = false;
      this.connexionForm.reset();
    }
  }

  public get enabled() {
    return this.connexionForm.valid && !this.submitting;
  }
}
