import { PhpInfo, Project, RepoTree, EnvVars, GithubUrlVerification } from './../models/api/project.model';
import { Router } from '@angular/router';
import { ProgressService } from './progress.service';
import { User } from '../models/api/user.model';
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

  private loadingUser: Promise<any>;
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

  public async loadUser(force = false): Promise<User | undefined> {
    // If there is already a request we wait for the request resolution and we return it
    if (this.loadingUser) {
      await this.loadingUser;
      return this.loadUser(force);
    } else {
      if (!this.logged) return undefined;
      if (this.user && !force) return this.user;
      try {
        // We return the user saved and we keep the request handle so we can wait for it
        return this.user = new User(await (this.loadingUser = this.get<User>(`/auth/me`)));
      } catch (e) {
        console.error(e);
        this.logout();
        this._snackbar.snack("Connexion impossible !");
      } finally {
        this.loadingUser = undefined;
      }
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

  public watchStatus(): Subject<ProjectStatusResponse> {
    try {
      if (!this._subject) {
        this._subject = new Subject<ProjectStatusResponse>();
        this._sse.getSse(`/project/${this.project!.id}/status`, { authorization: this.token })
          .pipe(finalize(() => { this._subject = null }))
          .subscribe(this._subject);
      }
      return this._subject;
    } catch (e) {
      console.error(e);
    }
  }
  public exitProject() {
    if (this._subject) {
      this._subject.complete();
      this._subject = null;
    }
    this.project = undefined;
  }

  public async verifyRepositoryLink(link: string): Promise<GithubUrlVerification> {
    return await this.get<GithubUrlVerification>(`/project/check-bot-github?link=${link}`);
  }

  public async checkProjectName(name: string): Promise<boolean> {
    try {
      await this.get<boolean>(`/project/exists/${name}`);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async createProject(body: PostProjectRequest): Promise<Project> {
    const project = new Project(await this.post<PostProjectRequest, Project>(`/project`, body));
    this.user.addProject(project);
    return project;
  }

  public async getRepoTree(url: string, sha?: string) {
    return await this.get<RepoTree>(`/project/repo-tree?link=${encodeURIComponent(url)}` + (sha ? `&sha=${sha}` : ''));
  }


  public async linkProjectToGithub(projectId: string = this.project?.id): Promise<void> {
    await this.post(`/project/${projectId}/github-link`);
  }

  public async linkProjectToDocker(projectId: string = this.project?.id): Promise<Project> {
    return new Project(await this.post(`/project/${projectId}/docker-link`));
  }

  public async linkProjectToMysql(projectId: string = this.project?.id): Promise<Project> {
    return new Project(await this.post(`/project/${projectId}/mysql-link`));
  }

  public async toggleContainer() {
    await this.post(`/project/${this.project!.id}/toggle`);
  }

  public async patchPhpError(phpInfos: PhpInfo, ) {
    await this.patch(`/project/${this.project!.id}/php-log-level`, phpInfos);
  }

  public async patchHttpRoot(httpRootUrl: string, httpRootUrlSha: string) {
    await this.patch(`/project/${this.project!.id}/http-root-url`, { httpRootUrl, httpRootUrlSha });
  }

  public async patchEnv(env: EnvVars) {
    await this.patch(`/project/${this.project!.id}/env`, { env });
  }
  public async patchUsers(users: string[]) {
    return this.project = await this.patch<unknown, Project>(`/project/${this.project!.id}/user-access`, { users });
  }

  public async toggleNotifications() {
    return this.patch(`/project/${this.project!.id}/toggle-notifications`);
  }

  public async deleteProject() {
    await this.delete(`/project/${this.project!.id}`);
    this.user.removeProject(this.project!.id);
    this.project = undefined;
  }
}
