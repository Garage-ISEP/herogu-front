import { CreateProjectRequest, RepoTree } from './../../models/api/project.model';
import { ApiService } from './../../services/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { makeid } from 'src/app/utils/string.util';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  public infosForm: FormGroup;
  public configForm: FormGroup;
  public repoForm: FormGroup;
  public autocompleteDirTree?: RepoTree["tree"] = [];
  public loadedAutocompleteDirChoices?: RepoTree;
  public botInstalled?: boolean;
  public timeoutChecked?: number;

  public readonly projectDomain = environment.projectDomain;

  @ViewChild(MatAutocompleteTrigger)
  public autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild(MatVerticalStepper)
  public stepper: MatVerticalStepper;

  constructor(
    private readonly _api: ApiService,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackbar: SnackbarService,
    private readonly _changeDetector: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.infosForm = this._formBuilder.group({
      projectName: ['', [
        Validators.required,
        Validators.pattern(/^(?!(create|admin|garage|isep|herogu|auth|phpmyadmin|portainer|traefik|data|post|get|put|dashboard|dash|board|-))([a-z-0-9-]{3,15})(?<!-)$/),
      ], [this._getProjectNameValidator()]],
      enablePHP: [true],
      enableMysql: [true],
      addedUsers: [[]]
    });
    this.configForm = this._formBuilder.group({
      //Github link regex:
      githubLink: ['', [Validators.required, Validators.pattern(/^(https?:\/\/github.com\/.{2,}\/.{2,})$/)]],
      enableNotifications: [true],
    });
    this.repoForm = this._formBuilder.group({
      rootDir: ['/', [Validators.required]],
      rootDirSha: [''],
      env: [[] as [string, string][]],
    });
    this.configForm.controls.githubLink.valueChanges.subscribe(() => this._setTimeoutGithubLink());
  }

  public removeEntry(index: number) {
    this.repoForm.value.env.splice(index, 1);
  }

  public addEntry() {
    this.repoForm.value.env.push(['NEW_KEY_' + makeid(3), '']);
  }

  public updateEntryKey(index: number, key: string) {
    this.repoForm.value.env[index][0] = key;
  }

  public updateEntryValue(index: number, value: string) {
    this.repoForm.value.env[index][1] = value;
  }

  public async getDirAutoComplete(repoTree?: RepoTree) {
    if (!this.configForm.controls.githubLink.value)
      return;
    try {
      const currentPath = this.rootDirVal;
      repoTree ??= await this._api.getRepoTree(this.configForm.controls.githubLink.value, this.autocompleteDirTree[this.autocompleteDirTree.length - 1]?.sha);
      for (const node of repoTree.tree)
        node.fullPath = currentPath + (!currentPath.endsWith('/') ? '/' : '') + node.path;
      this.loadedAutocompleteDirChoices = repoTree;
      this._changeDetector.detectChanges();
      return repoTree;
    } catch (e) {
      console.error(e);
    }
  }

  public async addAutoCompleteDir(dir: RepoTree["tree"][0]) {
    this.autocompleteDirTree.push(dir);
    await this.getDirAutoComplete();
    this.autocompleteTrigger.openPanel();
  }
  public async removeLastAutoCompleteDir() {
    if (this.autocompleteDirTree.length == 0)
      return;
    this.autocompleteDirTree.pop();
    this.repoForm.get('rootDir').setValue(this.rootDirVal);
    await this.getDirAutoComplete();
  }

  public get rootDirVal() {
    const dir = this.autocompleteDirTree.reduce((acc, cur) => acc + '/' + cur.path, '');
    if (!dir.startsWith('/'))
      return '/' + dir;
    return dir;
  }

  public get createInfos() {
    this.repoForm.get('rootDirSha').setValue(this.autocompleteDirTree[this.autocompleteDirTree.length - 1]?.sha);
    if (this.configForm.valid && this.infosForm.valid && this.repoForm.valid && this.stepper.selectedIndex === 3)
      return new CreateProjectRequest(this.infosForm, this.configForm, this.repoForm);
    else return undefined;
  }

  private _setTimeoutGithubLink() {
    if (this.timeoutChecked)
      window.clearTimeout(this.timeoutChecked);
    this.timeoutChecked = window.setTimeout(() => this._onGithubLinkUpdated(), 300);
  }

  private _getProjectNameValidator(): AsyncValidatorFn {
    return async (control: FormGroup) => {
      if (control.value?.length < 3)
        return null;
      const res = await this._api.checkProjectName(control.value);
      if (!res)
        return { existError: true };
      else return null;
    };
  }

  private async _onGithubLinkUpdated() {
    if (this.configForm.get('githubLink').invalid)
      return;
    try {
      const res = await this._api.verifyRepositoryLink(this.configForm.controls.githubLink.value);
      this.botInstalled = res.status;
      if (res.status)
        await this.getDirAutoComplete(res.tree);
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible de vérifier l'installation du bot sur le repo Github !");
      this.botInstalled = undefined;
    } finally {
      this.timeoutChecked = undefined;
    }
  }

}
