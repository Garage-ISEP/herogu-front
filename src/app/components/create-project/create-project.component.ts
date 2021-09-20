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

  public botInstalled?: "checking" | "invalid" | "valid";

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
    this.configForm.controls.githubLink.valueChanges.subscribe(() => this.onGithubLinkUpdated());
  }

  private async onGithubLinkUpdated() {
    if (!/^((http)|(https):\/\/github.com\/).*$/.test(this.configForm.controls.githubLink.value))
      return;
    this.botInstalled = 'checking';
    try {
      this.botInstalled = await this._api.verifyRepositoryLink(this.configForm.controls.githubLink.value) ? "valid" : "invalid";
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible de vérifier l'installation du bot sur le repository !");
      this.botInstalled = undefined;
    }
  }

}
