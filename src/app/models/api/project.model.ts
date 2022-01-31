import { LoadingState } from './../../components/create-project/project-creation-infos/project-creation-infos.component';
import { FormGroup } from "@angular/forms";

export class CreateProjectRequest {

  public projectName: string;
  public enablePHP: boolean;
  public enableMysql: boolean;
  public enableNotifications: boolean;
  public addedUsers: string[];
  public githubLink: string;
  public accessToken: string;
  public env: [string, string][];
  public rootDir: string;

  constructor(infosForm: FormGroup, configForm: FormGroup, repoForm: FormGroup) {
    Object.assign(this, infosForm.value, configForm.value, repoForm.value);
    if (this.enableMysql && !this.enablePHP)
      this.enableMysql = false;
  }
}
export class PostProjectRequest {

  public name: string;
  public githubLink: string;
  public type: "nginx" | "php";
  public mysqlEnabled = false;
  public notificationsEnabled = false;
  public addedUsers: string[];
  public accessToken: string;
  public env: { [key: string]: string };
  public rootDir: string;

  constructor(createProject: CreateProjectRequest) {
    this.name = createProject.projectName;
    this.githubLink = createProject.githubLink;
    this.type = createProject.enablePHP ? "php" : "nginx";
    this.mysqlEnabled = createProject.enableMysql;
    this.notificationsEnabled = createProject.enableNotifications;
    this.addedUsers = createProject.addedUsers;
    this.accessToken = createProject.accessToken;
    this.rootDir = createProject.rootDir;
    this.env = Object.fromEntries(createProject.env);
  }
}

export interface RepoTree {
  sha: string;
  url: string;
  truncated: boolean;
  tree: {
    path?: string;
    fullPath?: string;
    mode?: string;
    type?: string;
    sha?: string;
    size?: number;
    url?: string;
  }[];
}
export type ProjectStatusResponse = {
  status: ProjectStatus | ContainerStatus;
  origin: Origin;
  exitCode?: number,
}
export enum ProjectType {
  NGINX = "NGINX",
  PHP = "PHP",
}

export enum ProjectStatus {
  ERROR = "ERROR",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
}
export enum ContainerStatus {
  Running = "Running",
  Error = "Error",
  Stopped = "Stopped",
  Restarting = "Restarting",
  NotFound = "NotFound"
}
export type Origin = "docker" | "container" | "mysql" | "github";