import { CreateProjectRequest } from './../../models/api/project.model';
import { ProgressService } from './../../services/progress.service';
import { ApiService } from './../../services/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  public infosForm: FormGroup;
  public configForm: FormGroup;

  public botInstalled?: boolean;
  public timeoutChecked?: number;

  @ViewChild(MatVerticalStepper)
  public stepper: MatVerticalStepper;

  constructor(
    private readonly _api: ApiService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackbar: SnackbarService,
  ) { }

  public ngOnInit(): void {
    this.infosForm = this._formBuilder.group({
      projectName: ['', [Validators.required, Validators.pattern(/^(?!(create|admin|garage|isep))\w{3,10}$/)]],
      enablePHP: ['true'],
      enableMysql: ['true'],
      addedUsers: [[]]
    });
    this.configForm = this._formBuilder.group({
      githubLink: ['', [Validators.required, Validators.pattern(/^((http)|(https):\/\/github.com\/).*$/)]],
      enableNotifications: ['true'],
    });
    this.configForm.controls.githubLink.valueChanges.subscribe(() => this._setTimeoutGithubLink());
  }

  public get createInfos() {
    if (this.configForm.valid && this.infosForm.valid && this.stepper.selectedIndex === 2)
      return new CreateProjectRequest(this.infosForm, this.configForm);
    else return undefined;
  }
  private _setTimeoutGithubLink() {
    if (this.timeoutChecked)
      window.clearTimeout(this.timeoutChecked);
    this.timeoutChecked = window.setTimeout(() => this._onGithubLinkUpdated(), 300);
  }

  private async _onGithubLinkUpdated() {
    if (!/^((http)|(https):\/\/github.com\/).*$/.test(this.configForm.controls.githubLink.value))
      return;
    try {
      this.botInstalled = await this._api.verifyRepositoryLink(this.configForm.controls.githubLink.value);
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible de vérifier l'installation du bot sur le repository !");
      this.botInstalled = undefined;
    } finally {
      this.timeoutChecked = undefined;
    }
  }

}
