import { Component, Input, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ContainerStatus } from 'src/app/models/api/project.model';
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

  constructor(
    private readonly _api: ApiService,
  ) { }

  public async ngOnInit() {
    this._api.watchStatus(this.project.id).subscribe(status => {
      if (status.origin !== "docker")
        return;
      if (status.status === ContainerStatus.Running)
        this.started = true;
      else if (status.status === ContainerStatus.Stopped)
        this.started = false;
      else this.started = undefined;
      console.log(this.started);
    });
  }

  public async toggleContainer() {
    this._api.toggleContainer(this.project.id);
  }
}
