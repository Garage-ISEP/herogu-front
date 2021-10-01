import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/api/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private projectId?: string;

  constructor(
    private readonly _api: ApiService,
    private readonly _route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._route.params.subscribe(params => this.projectId = params.id);
  }

  public get project(): Project {
    return this._api.user!.projects.find(el => el.id === this.projectId);
  }

}
