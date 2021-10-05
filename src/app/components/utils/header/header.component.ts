import { ProgressService } from '../../../services/progress.service';
import { ApiService } from 'src/app/services/api.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public display: boolean = false;

  constructor(
    private readonly _api: ApiService,
    private readonly _progress: ProgressService,
    private readonly _changes: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this._progress.subject.subscribe(e => {
      this.display = e;
      this._changes.detectChanges();
    });
  }
  
  public get logged() {
    return this._api.logged;
  }

  public get user() {
    return this._api.user;
  }

  public get mode() {
    return this._progress.mode;
  }

  public get value() {
    return this._progress.value;
  }
}
