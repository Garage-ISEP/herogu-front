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
  public createImageState?: LoadingState;
  public dockerCreationState?: LoadingState;
  public mysqlCreationState?: LoadingState;

  public projectCreationError?: string;
  public githubCreationError?: string;
  public createImageError?: string;
  public dockerCreationError?: string;
  public mysqlCreationError?: string;

  private _workflowId?: number;

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
      this.createImageState = "loading";
      const observable = this._api.createImageState(this.createdProject.id);
      await new Promise<void>((resolve, reject) => observable.subscribe(o => {
        if (typeof o === "object" && o.id)
          this._workflowId = o.id;
        switch (o) {
          case "none":
            this.createImageState = "error";
            this.createImageError = "Aucun workflow détecté !";
            reject(this.createImageError);
            break;
          case "failure":
            this.createImageState = "error";
            this.createImageError = "Erreur lors de la création de l'image !"
            reject(this.createImageError);
            break;
          case "in_progress":
            this.createImageState = "loading";
            break;
          case "success":
            this.createImageState = "loaded";
            resolve();
            break;
        }
      }));
    } catch (e) {
      console.error(e);
      this.createImageState = "error";
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

  public get workflowUrl(): string | undefined {
    if (!this._workflowId) return;
    const [owner, repo] = this.createInfos.githubLink.split("/").slice(-2);
    return `https://github.com/${owner}/${repo}/actions/runs/${this._workflowId}`;
  }
}

export type LoadingState = 'loading' | 'loaded' | 'error';