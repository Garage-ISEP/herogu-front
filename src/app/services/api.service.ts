import { Router } from '@angular/router';
import { ProgressService } from './progress.service';
import { Project, User } from '../models/api/user.model';
import { LoginResponseModel } from '../models/api/auth.model';
import { LoginRequestModel } from '../models/api/auth.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { BaseApi } from '../utils/base-api.util';
import { SnackbarService } from './snackbar.service';
import { PostProjectRequest, ProjectStatusResponse } from '../models/api/project.model';
import { SseService } from './sse.service';
import { Subject } from 'rxjs';
import { finalize } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseApi {

  public user?: User;
  public project?: Project;
  
  private _subject: Subject<ProjectStatusResponse>;

  constructor(
    http: HttpClient,
    progress: ProgressService,
    router: Router,
    private readonly _snackbar: SnackbarService,
    private readonly _sse: SseService,
  ) {
    super(http, progress, router);
  }

  public async login(body: LoginRequestModel) {
    try {
      this.progress.toggle();
      const res = await this.http.post<LoginResponseModel>(environment.api + "/auth/login", body).toPromise();
      this.token = res.token;
      return this.user = new User(res.user);
    } finally {
      this.progress.toggle();
    }
  }

  public async loadUser(): Promise<User | undefined> {
    if (!this.logged) return undefined;
    if (this.user) return this.user;
    try {
      return this.user = new User(await this.get<User>(`/auth/me`));
    } catch (e) {
      console.error(e);
      this.logout();
      this._snackbar.snack("Connexion impossible !");
    }
  }

  public async loadProject(id: string, force = false): Promise<Project> {
    if (!this.logged) return undefined;
    if (this.project && !force) return this.project;
    try {
      return this.project = new Project(await this.get<Project>(`/project/${id}`));
    } catch (e) {
      console.error(e);
      this._snackbar.snack("Impossible de charger le projet");
    }
  }

  public watchStatus(projectId: string): Subject<ProjectStatusResponse> {
    try {
      if (!this._subject) {
        this._subject = new Subject<ProjectStatusResponse>();
        this._sse.getSse(`/project/${projectId}/status`, { authorization: this.token })
          .pipe(finalize(() => { this._subject = null }))
          .subscribe(this._subject);
      }
      return this._subject;
    } catch (e) {
      console.error(e);
    }
  }

  public async verifyRepositoryLink(link: string): Promise<boolean> {
    return await this.get<boolean>(`/project/check-bot-github?link=${link}`);
  }

  public async createProject(body: PostProjectRequest): Promise<Project> {
    return new Project(await this.post<PostProjectRequest, Project>(`/project`, body));
  }

  public async linkProjectToGithub(projectId: string): Promise<void> {
    await this.post(`/project/${projectId}/github-link`);
  }

  public async linkProjectToDocker(projectId: string): Promise<void> {
    await this.post(`/project/${projectId}/docker-link`);
  }

  public async linkProjectToMysql(projectId: string): Promise<Project> {
    return new Project(await this.post(`/project/${projectId}/mysql-link`));
  }

  public async toggleContainer(projectId: string) {
    await this.post(`/project/${projectId}/toggle`);
  }

  public async deleteProject(projectId: string) {
    await this.delete(`/project/${projectId}`);
  }
}
