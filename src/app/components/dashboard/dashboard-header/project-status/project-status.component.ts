import { Component, Input, OnInit } from '@angular/core';
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

  public projectStatus: ProjectStatusResponse;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public ngOnInit(): void {
    this._api.watchStatus(this.project.id).subscribe(status => this.projectStatus = status);
  }

}

