import { SnackbarService } from './../../../../services/snackbar.service';
import { PhpInfo } from './../../../../models/api/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-php-config',
  templateUrl: './php-config.component.html',
  styleUrls: ['./php-config.component.scss']
})
export class PhpConfigComponent implements OnInit {

  @Input()
  public phpInfos: PhpInfo;
  
  constructor(
    private readonly _api: ApiService,
    private readonly _snackbar: SnackbarService,
  ) { }

  public ngOnInit(): void {
    
  }

  public async applyChanges() {
    try {
      await this._api.patchPhpError(this.phpInfos);
    } catch (e) {
      this._snackbar.snack("Impossible d'appliquer les changements");
      console.error(e);
    }
  }

  public get logLevelIcons(): [string, string][] {
    return [["error", "Tout"], ["warning", "Alertes"], ["error", "Erreurs"], ["none", "Aucun"]];
  }

}
