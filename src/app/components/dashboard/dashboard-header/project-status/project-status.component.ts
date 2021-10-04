import { Origin, ProjectStatus, ContainerStatus } from './../../../../models/api/project.model';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProjectStatusResponse } from 'src/app/models/api/project.model';
import { Project } from 'src/app/models/api/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  @Input()
  public project: Project;

  public readonly projectStatus = new Map<Origin, ProjectStatusResponse>();
  public viewErrors = false;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public ngOnInit(): void {
    this._api.watchStatus(this.project.id).subscribe(status => this.projectStatus.set(status.origin, status));
  }

  public get status(): ProjectStatus {
    for (const response of this.projectStatus.values()) {
      if (response.status === ProjectStatus.IN_PROGRESS || response.status === ContainerStatus.Restarting)
        return ProjectStatus.IN_PROGRESS;
      else if (response.status === ProjectStatus.ERROR || response.status === ContainerStatus.Error || response.status === ContainerStatus.NotFound || response.status === ContainerStatus.Stopped)
        return ProjectStatus.ERROR;
    }
    return ProjectStatus.SUCCESS;
  }

  @HostListener('window:scroll')
  public onScroll() {
    if (this.viewErrors)
      this.viewErrors = false;
  }

  public get errors(): ProjectStatusResponse[] {
    console.log(Array.from(this.projectStatus.values()).filter(status => status.origin));
    return Array.from(this.projectStatus.values()).filter(status => status.origin);
  }

}

