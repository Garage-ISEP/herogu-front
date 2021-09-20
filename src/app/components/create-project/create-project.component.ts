import { ProgressService } from './../../services/progress.service';
import { ApiService } from './../../services/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("stepper")
  private stepper: MatVerticalStepper;

  constructor(
    private readonly _api: ApiService,
    private readonly _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.infosForm = this._formBuilder.group({
      projectName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.pattern('^((?!create).)*$')]],
      enablePHP: ['true'],
      enableMysql: ['true'],
      addedUsers: [[]]
    });
    this.configForm = this._formBuilder.group({
      githubLink: [''],
      enableNotifications: ['true'],
    });
  }

  public async createProject() {
    //TODO: Create project
  }
}
