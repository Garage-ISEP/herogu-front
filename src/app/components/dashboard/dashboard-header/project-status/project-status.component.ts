import { Origin, ProjectStatus, ContainerStatus } from './../../../../models/api/project.model';
import { AfterContentInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { ProjectStatusResponse } from 'src/app/models/api/project.model';
import { Project } from 'src/app/models/api/project.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements AfterContentInit {

  @Input()
  public project: Project;

  public readonly projectStatus = new Map<Origin, ProjectStatusResponse>();
  public viewErrors = false;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public ngAfterContentInit(): void {
    this._api.watchStatus().subscribe(status => this.projectStatus.set(status.origin, status));
  }

  public get status(): ProjectStatus | ContainerStatus.Stopped {
    for (const response of this.projectStatus.values()) {
      if (response.status === ProjectStatus.IN_PROGRESS || response.status === ContainerStatus.Restarting)
        return ProjectStatus.IN_PROGRESS;
      else if (response.status === ProjectStatus.ERROR || response.status === ContainerStatus.Error || response.status === ContainerStatus.NotFound)
        return ProjectStatus.ERROR;
      else if (response.status === ContainerStatus.Stopped)
        return ContainerStatus.Stopped;
    }
    return ProjectStatus.SUCCESS;
  }

  @HostListener('window:scroll')
  public onScroll() {
    if (this.viewErrors)
      this.viewErrors = false;
  }

}

