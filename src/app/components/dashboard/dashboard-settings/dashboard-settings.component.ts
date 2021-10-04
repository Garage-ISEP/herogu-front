import { User } from './../../../models/api/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/api/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent {

  constructor(
    private readonly _api: ApiService,
  ) { }


  public get project(): Project {
    return this._api.project;
  }

  public get isAuthor(): boolean {
    return this._api.user!.id === this.project.creatorId;
  }

  public get collaborators(): User[] {
    return this.project.collaborators.filter(el => el.userId != this._api.user!.id).map(el => el.user);
  }


}
