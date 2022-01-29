import { CreateProjectRequest, PostProjectRequest } from './../../../models/api/project.model';
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
  public mysqlCreationState?: LoadingState;
  public dockerCreationState?: LoadingState;

  public projectCreationError?: string;
  public githubCreationError?: string;
  public mysqlCreationError?: string;
  public dockerCreationError?: string;

  private _workflowId?: number;

  public createdProject?: Project;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public async ngOnInit() {
    try {
      await this._postProject();
    } catch (e) { }
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
      await this._api.linkProjectToGithub(this.createdProject.id);
      this.githubCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.githubCreationState = "error";
      this.githubCreationError = "Erreur lors de la connexion avec GitHub";
      throw new Error(e);
    }
    if (this.createdProject.mysqlEnabled) {
      try {
        this.mysqlCreationState = "loading";
        await this._api.linkProjectToMysql(this.createdProject.id);
        this.mysqlCreationState = "loaded";
      } catch (e) {
        console.error(e);
        this.mysqlCreationState = "error";
        this.mysqlCreationError = "Erreur lors de la création de la base de données MySQL";
      }
    }
    try {
      this.dockerCreationState = "loading";
      await this._api.linkProjectToDocker(this.createdProject.id);
      this.dockerCreationState = "loaded";
    } catch (e) {
      console.error(e);
      this.dockerCreationState = "error";
      this.dockerCreationError = "Erreur lors de la création du conteneur Docker";
    }
  }

  public get workflowUrl(): string | undefined {
    if (!this._workflowId) return;
    const [owner, repo] = this.createInfos.githubLink.split("/").slice(-2);
    return `https://github.com/${owner}/${repo}/actions/runs/${this._workflowId}`;
  }

  public isDone(): boolean {
    return this.createdProject
      && this.projectCreationState === "loaded"
      && this.githubCreationState === "loaded"
      && this.mysqlCreationState === "loaded"
      && this.dockerCreationState === "loaded";
  }
}

export type LoadingState = 'loading' | 'loaded' | 'error';