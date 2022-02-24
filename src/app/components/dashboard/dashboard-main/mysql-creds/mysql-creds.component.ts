import { SnackbarService } from './../../../../services/snackbar.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-mysql-creds',
  templateUrl: './mysql-creds.component.html',
  styleUrls: ['./mysql-creds.component.scss']
})
export class MysqlCredsComponent {


  constructor(
    private readonly _clipboard: Clipboard,
    private readonly _snackbar: SnackbarService,
  ) { }
  @Input()
  public project: Project;

  public showPass = false;
  public showUser = false;

  public copy(value: string) {
    this._clipboard.copy(value);
    this._snackbar.snack("Information copiée dans le presse-papier ! ");
  }

}
