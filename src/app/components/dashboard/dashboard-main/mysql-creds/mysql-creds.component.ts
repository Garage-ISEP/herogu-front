import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-mysql-creds',
  templateUrl: './mysql-creds.component.html',
  styleUrls: ['./mysql-creds.component.scss']
})
export class MysqlCredsComponent {


  @Input()
  public project: Project;

  public showPass = false;
  public showUser = false;

}
