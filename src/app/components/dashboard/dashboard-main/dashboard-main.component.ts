import { Component, OnInit } from '@angular/core';
import { ContainerStatus, Origin, ProjectStatus, ProjectStatusResponse } from 'src/app/models/api/project.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {


  public readonly projectStatus = new Map<Origin, ProjectStatusResponse>();


  constructor(
    private readonly _api: ApiService,
  ) { }

  public ngOnInit() {
    this._api.watchStatus(this.project.id).subscribe(el => { this.projectStatus.set(el.origin, el); console.log(el); });
  }

  public async redeployProject() {
    const res = await this._api.linkProjectToDocker(this.project.id);
  }

  public async redeployMysql() {
    this._api.project = await this._api.linkProjectToMysql(this.project.id);
  }

  public get hasMysql() {
    return this.project.mysqlEnabled && !this.shouldRebuildMysql;
  } 

  public get hasPhp() {
    return !!this.project.phpInfo;
  }

  public get project() {
    return this._api.project;
  }

  public get shouldRebuildContainer() {
    return this.projectStatus.get("docker")?.status === ContainerStatus.NotFound || this.projectStatus.get("container")?.status === ContainerStatus.Restarting || this.projectStatus.get("container")?.status === ContainerStatus.Error;
  }
  public get shouldRebuildMysql() {
    return (this.projectStatus.get("mysql")?.status === ProjectStatus.ERROR || this.projectStatus.get("mysql")?.status === ProjectStatus.IN_PROGRESS) && this.project.mysqlEnabled;
  }
  public get shouldLinkToGithub() {
    return this.projectStatus.get("github")?.status === ProjectStatus.ERROR;
  }

}
