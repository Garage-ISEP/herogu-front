import { ProgressService } from './../../services/progress.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  public infosForm: FormGroup;
  public configForm: FormGroup;
  public webhookForm: FormGroup;

  @ViewChild("stepper")
  private stepper: MatVerticalStepper;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.infosForm = this.formBuilder.group({
      projectName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.pattern('^((?!create).)*$')]],
      enablePHP: ['true'],
      enableMysql: ['true'],
    });
    this.webhookForm = this.formBuilder.group({
      enableNotifications: ['true']
    });
  }

  public async createProject() {
    //TODO: Create project
  }
}
