import { Component, Input, OnInit } from '@angular/core';
import { EnvVars } from 'src/app/models/api/project.model';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { makeid, parseEnvFile } from 'src/app/utils/string.util';

@Component({
  selector: 'app-env-config',
  templateUrl: './env-config.component.html',
  styleUrls: ['./env-config.component.scss']
})
export class EnvConfigComponent implements OnInit {

  @Input()
  public env: EnvVars;

  public envEntries: [string, string][] = [];

  public modified = false;

  constructor(
    private readonly _api: ApiService,
    private readonly _snackbar: SnackbarService,
  ) { }

  public ngOnInit(): void {
    this.envEntries = Object.entries(this.env);
  }

  
  public removeEntry(index: number) {
    this.modified = true;
    this.envEntries.splice(index, 1);
  }

  public addEntry() {
    this.modified = true;
    const previousHeight = document.body.clientHeight;
    this.envEntries.push(['NEW_KEY_' + makeid(3), '']);
    setTimeout(() => {
      window.scrollBy({ top: document.body.clientHeight - previousHeight, behavior: 'smooth' });
    }, 0);
  }

  public updateEntryKey(index: number, key: string) {
    this.modified = true;
    this.envEntries[index][0] = key;
  }

  public updateEntryValue(index: number, value: string) {
    this.modified = true;
    this.envEntries[index][1] = value;
  }

  public async applyChanges() {
    try {
      this.modified = false;
      this.env = Object.fromEntries(this.envEntries);
      console.log(this.env);
      await this._api.patchEnv(undefined, this.env);
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible de mettre à jour les variables d'environnement !");
      this.modified = true;
    }
  }

  public async uploadEnvFile(file: File) {
    const previousHeight = document.body.clientHeight;
    this.envEntries.push(...parseEnvFile(await file.text()));
    setTimeout(() => {
      window.scrollBy({ top: document.body.clientHeight - previousHeight, behavior: 'smooth' });
    }, 0);
    this.modified = true;
  }

}
