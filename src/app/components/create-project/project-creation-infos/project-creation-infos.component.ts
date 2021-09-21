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

  public projectCreationState?: LoadingState;
  public githubCreationState?: LoadingState;
  public dockerCreationState?: LoadingState;
  public mysqlCreationState?: LoadingState;

  public projectCreationError?: string;
  public githubCreationError?: string;
  public dockerCreationError?: string;
  public mysqlCreationError?: string;

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
      this.projectCreationState = "loading";
      await this._api.createProject(new PostProjectRequest(this.createInfos));
      this.projectCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.projectCreationState = "error";
      this.projectCreationError = "Erreur lors de la création du projet";
      throw new Error(e);
    }
  }

}

export type LoadingState = 'loading' | 'loaded' | 'error';