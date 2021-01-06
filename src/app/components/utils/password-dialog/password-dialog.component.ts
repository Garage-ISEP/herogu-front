import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdatePasswordModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
})
export class PasswordDialogComponent {

  constructor(
    private readonly apiService: ApiService,
    public readonly dialogRef: MatDialogRef<PasswordDialogComponent>,
  ) {}

  public data: UpdatePasswordModel = {new_password: "", old_password: "", confirm_password: ""};
  public passwordError: boolean = false;

  public onConfirm(form: HTMLFormElement) {
    this.passwordError = this.data.confirm_password !== this.data.new_password;
    if (!form.checkValidity() || this.passwordError) {
      this.apiService.snack("Formulaire invalide !", 3000);
    } else {
      this.dialogRef.close(this.data);
    }
  }
}
