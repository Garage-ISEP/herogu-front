import { SnackbarService } from './../../../../services/snackbar.service';
import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PhpInfo, PhpLogLevel } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-php-config',
  templateUrl: './php-config.component.html',
  styleUrls: ['./php-config.component.scss']
})
export class PhpConfigComponent {

  @Input()
  public phpInfos: PhpInfo;

  @Input()
  public disabled = false;

  public readonly logLevels = [["report", "Tout"], ["report_problem", "Alertes"], ["bug_report", "Erreurs"], ["report_off", "Aucun"]];
  
  constructor(
    private readonly _api: ApiService,
    private readonly _snackbar: SnackbarService,
  ) { }

  public updateLogLevel(index: number): void {
    if (index == this.logSelectedIndex)
      return;
    this.phpInfos.logLevel = Object.values(PhpLogLevel)[index];
    this.applyChanges();
  }

  public async applyChanges() {
    try {
      await this._api.patchPhpError(this.phpInfos);
    } catch (e) {
      this._snackbar.snack("Impossible d'appliquer les changements");
      console.error(e);
    }
  }

  public get logSelectedIndex(): number {
    return Object.values(PhpLogLevel).indexOf(this.phpInfos.logLevel);
  }

}
