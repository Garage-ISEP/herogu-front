import { ProgressService } from '../../../services/progress.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private readonly _api: ApiService,
    public readonly progress: ProgressService,
  ) { }
  
  public get logged() {
    return this._api.logged;
  }

  public get user() {
    return this._api.user;
  }
}
