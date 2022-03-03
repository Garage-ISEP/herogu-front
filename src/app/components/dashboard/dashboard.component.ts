import { Project } from 'src/app/models/api/project.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public project?: Project;

  constructor(
    private readonly _api: ApiService,
    private readonly _route: ActivatedRoute,
  ) { }
  
  public ngOnInit(): void {
    this._route.params.subscribe(async params => this.project = await this._api.loadProject(params.id));
  }
  
  public ngOnDestroy(): void {
    this._api.unwatchStatus();
  }
  
}
