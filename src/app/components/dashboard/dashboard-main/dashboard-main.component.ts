import { SnackbarService } from './../../../services/snackbar.service';
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
    private readonly _snackbar: SnackbarService,
  ) { }

  public ngOnInit() {
    this._api.watchStatus().subscribe(el => {
      this.projectStatus.set(el.origin, el);
      console.log(el);
    });
  }

  public async redeployProject() {
    try {
      this._api.project = await this._api.linkProjectToDocker();
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Erreur lors du déploiement du project !");
    }
  }

  public async redeployMysql() {
    try {
      this._api.project = await this._api.linkProjectToMysql();
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Erreur lors du déploiement de la base de données");
    }
  }

  public get hasMysql() {
    return this.project.mysqlEnabled && !this.shouldRebuildMysql;
  }

  public get hasPhp() {
    return !!this.project.phpInfo;
  }

  public get hasQuota() {
    return !!this.project.rwSize;
  }

  public get project() {
    return this._api.project;
  }

  public get shouldRebuildContainer() {
    return (
      this.projectStatus.get("docker")?.status === ContainerStatus.NotFound ||
      this.projectStatus.get("container")?.status === ContainerStatus.Restarting ||
      this.projectStatus.get("container")?.status === ContainerStatus.Error ||
      this.projectStatus.get("image")?.status === ProjectStatus.ERROR
    ) && this.projectStatus.get("docker")?.status !== ContainerStatus.Running;
  }
  public get shouldRebuildMysql() {
    return (this.projectStatus.get("mysql")?.status === ProjectStatus.ERROR || this.projectStatus.get("mysql")?.status === ProjectStatus.IN_PROGRESS) && this.project.mysqlEnabled;
  }
  public get projectPaused() {
    return this.projectStatus.get("docker")?.status !== ContainerStatus.Running;
  }

}
