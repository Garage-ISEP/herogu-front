import { CreateProjectRequest, GithubLinkRequest, PostProjectRequest } from './../../../models/api/project.model';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Project } from 'src/app/models/api/user.model';

@Component({
  selector: 'app-project-creation-infos',
  templateUrl: './project-creation-infos.component.html',
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

  private createdProject?: Project;

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
      this.createdProject = await this._api.createProject(new PostProjectRequest(this.createInfos));
      this.projectCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.projectCreationState = "error";
      this.projectCreationError = "Erreur lors de la création du projet";
      throw new Error(e);
    }
    try {
      this.githubCreationState = "loading";
      await this._api.linkProjectToGithub(this.createdProject.id, new GithubLinkRequest(this.createInfos));
      this.githubCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.githubCreationState = "error";
      this.githubCreationError = "Erreur lors de la connexion avec GitHub";
      throw new Error(e);
    }
    try {
      this.dockerCreationState = "loading";
      await this._api.linkProjectToDocker(this.createdProject.id);
      this.dockerCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.dockerCreationState = "error";
      this.dockerCreationError = "Erreur lors de la connexion avec Docker";
      throw new Error(e);
    }
    try {
      this.mysqlCreationState = "loading";
      await this._api.linkProjectToMysql(this.createdProject.id);
      this.mysqlCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.mysqlCreationState = "error";
      this.mysqlCreationError = "Erreur lors de la connexion avec MySQL";
      throw new Error(e);
    }
  }

}

export type LoadingState = 'loading' | 'loaded' | 'error';