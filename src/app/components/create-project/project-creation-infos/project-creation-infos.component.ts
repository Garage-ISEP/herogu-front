import { CreateProjectRequest, PostProjectRequest } from './../../../models/api/project.model';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Project } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-project-creation-infos',
  templateUrl: './project-creation-infos.component.html',
})
export class ProjectCreationInfosComponent implements OnInit {

  @Input()
  public createInfos: CreateProjectRequest;

  
  public states: { [key: string]: LoadingState } = {};
  public errors: { [key: string]: string } = {};

  public createdProject: Project;

  constructor(
    private readonly _api: ApiService,
    private readonly _changeDetector: ChangeDetectorRef
  ) { }

  public async ngOnInit() {
    try {
      if (!this.createdProject)
        this._postProject();
    } catch (e) { }
  }

  private async _postProject() {
    try {
      this.states.project = "loading";
      this.createdProject = await this._api.createProject(new PostProjectRequest(this.createInfos));
      this.states.project = "loaded";
    } catch (e) {
      console.error(e);
      this.states.project = "error";
      this.errors.project = "Erreur lors de la création du projet";
      throw new Error(e);
    } finally {
      this._changeDetector.detectChanges();
    }
    try {
      this.states.github = "loading";
        this._changeDetector.detectChanges();
        await this._api.linkProjectToGithub();
      this.states.github = "loaded";
    } catch (e) {
      console.error(e);
      this.states.github = "error";
      this.errors.github = "Erreur lors de la connexion avec GitHub";
      throw new Error(e);
    } finally {
      this._changeDetector.detectChanges();
    }
    if (this.createdProject.mysqlEnabled) {
      try {
        this.states.mysql = "loading";
        this._changeDetector.detectChanges();
        await this._api.linkProjectToMysql();
        this.states.mysql = "loaded";
      } catch (e) {
        console.error(e);
        this.states.mysql = "error";
        this.errors.mysql = "Erreur lors de la création de la base de données MySQL";
      } finally {
        this._changeDetector.detectChanges();
      }
    }
    try {
      this.states.docker = "loading";
      this._changeDetector.detectChanges();
      await this._api.linkProjectToDocker();
      this.states.docker = "loaded";
    } catch (e) {
      console.error(e);
      this.states.docker = "error";
      this.errors.docker = "Erreur lors de la mise en ligne du site";
    } finally {
      this._changeDetector.detectChanges();
    }
  }

  public isDone(): boolean {
    return this.createdProject
      && this.states.project === "loaded"
      && this.states.github === "loaded"
      && (!this.createInfos.enableMysql || this.states.mysql === "loaded")
      && this.states.docker === "loaded";
  }
}

export type LoadingState = 'loading' | 'loaded' | 'error';