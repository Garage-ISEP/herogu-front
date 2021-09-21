import { CreateProjectRequest, PostProjectRequest } from './../../../models/api/project.model';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-project-creation-infos',
  templateUrl: './project-creation-infos.component.html',
  styleUrls: ['./project-creation-infos.component.scss']
})
export class ProjectCreationInfosComponent implements OnInit {

  @Input()
  public createInfos: CreateProjectRequest;

  public projectCreation?: LoadingState;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public async ngOnInit() {
    try {
      await this._postProject();
    } catch(e) { }
  }
  
  private async _postProject() {
    try {
      this.projectCreation = "loading";
      await this._api.createProject(new PostProjectRequest(this.createInfos));
      this.projectCreation = "loaded";
    } catch (e) {
      console.error(e);
      this.projectCreation = "error";
      throw new Error(e);
    }
  }

}

type LoadingState = 'loading' | 'loaded' | 'error';