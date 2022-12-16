import { FormGroup } from '@angular/forms';
import { BaseModel } from '../base.model';
import { User, Collaborator } from './user.model';

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
  public rootDirSha: string;

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
  public rootDirSha: string;

  constructor(createProject: CreateProjectRequest) {
    this.name = createProject.projectName;
    this.githubLink = createProject.githubLink;
    this.type = createProject.enablePHP ? "php" : "nginx";
    this.mysqlEnabled = createProject.enableMysql;
    this.notificationsEnabled = createProject.enableNotifications;
    this.addedUsers = createProject.addedUsers;
    this.accessToken = createProject.accessToken;
    this.rootDir = createProject.rootDir;
    this.rootDirSha = createProject.rootDirSha;
    this.env = Object.fromEntries(createProject.env);
  }
}


export class Project extends BaseModel {
  id: string;
  name: string;
  lastBuild: string;
  githubLink: string;
  repoId: number;
  type: ProjectType;
  mysqlInfo: MysqlInfo;
  phpInfo: PhpInfo;
  nginxInfo: NginxInfo;
  notificationsEnabled: boolean;
  env: { [key: string]: string };
  creator: User;
  creatorId: string;
  collaborators: Collaborator[];
  createdDate: Date;
  updatedDate: Date;
  storageOverageDate: Date;
  maxRwSize: number;
  rwSize: number;

  public get mysqlEnabled() {
    return !!this.mysqlInfo;
  }
}

export class MysqlInfo extends BaseModel {

  public id: number;

  public projectId: string;

  public user: string;
  public password: string;
  public database: string;
}

export class PhpInfo extends BaseModel {

  public id: number;

  public project: Project;

  public logLevel: PhpLogLevel;

  public logEnabled: boolean;

  public env: EnvVars;
}

export type EnvVars = { [key: string]: string };

export class NginxInfo extends BaseModel {

  public id: number;

  public project: Project;

  public rootDir: string;

  public rootDirSha: string;
}

export enum PhpLogLevel {
  All = 'E_ALL',
  Warning = 'E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT',
  Error = 'E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED & ~E_STRICT',
  None = '~E_ALL',
}


export interface GithubUrlVerificationValid {
  status: true;
  tree: RepoTree;
}
export interface GithubUrlVerificationError {
  status: false;
}
export type GithubUrlVerification = GithubUrlVerificationValid | GithubUrlVerificationError; 
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
export type Origin = "docker" | "container" | "mysql" | "image";