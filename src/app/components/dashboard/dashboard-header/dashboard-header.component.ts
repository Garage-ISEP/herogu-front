import { Component, Input, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ContainerStatus, ProjectStatus } from 'src/app/models/api/project.model';
import { Project } from 'src/app/models/api/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input()
  public project: Project;

  public started?: boolean;
  public changing = false;

  private _previousStatus: ContainerStatus | ProjectStatus;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public async ngOnInit() {
    this._api.watchStatus(this.project.id).subscribe(status => {
      if (status.origin !== "docker")
        return;
      if (this.changing && status.status !== this._previousStatus) {
        this.changing = false;
        this._previousStatus = status.status;
      }
      if (status.status === ContainerStatus.Running || status.status === ProjectStatus.SUCCESS)
        this.started = true;
      else if (status.status === ContainerStatus.Stopped)
        this.started = false;
      else this.started = undefined;
    });
  }

  public async toggleContainer() {
    this.changing = true;
    await this._api.toggleContainer(this.project.id);
  }

  public get garageLink(): string {
    return `https://${this.project.name}.herogu.garageisep.com`;
  }
}
