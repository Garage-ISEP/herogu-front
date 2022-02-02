import { BaseModel } from "../base.model";
import { ProjectType } from "./project.model";

export class User extends BaseModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public mail: string;
  public studentId: string;
  public admin: boolean;
  public role: Role;
  public collaborators?: Collaborator[];
  public createdDate: Date;
  public updatedDate: Date;

  public get projects() {
    return this.collaborators?.map(el => el.project) || [];
  }
  public addProject(project: Project) {
    if (!this.collaborators) this.collaborators = [];
    this.collaborators.push(new Collaborator(project, this));
  }
  public removeProject(projectId: string) {
    if (!this.collaborators) return;
    this.collaborators = this.collaborators.filter(el => el.project.id !== projectId);
  }
}

export class Collaborator extends BaseModel {
  public id: number;
  public project: Project;
  public projectId: string;
  public user: User;
  public userId: string;
  public role: Role;
  public createdDate: Date;
  public updatedDate: Date;

  constructor(project: Project, user: User) {
    super({
      id: null,
      project: project,
      projectId: project.id,
      user: user,
      userId: user.id,
      role: Role.OWNER,
      createdDate: null,
      updatedDate: null
    });
  }
}


export enum Role {
  OWNER = "OWNER",
  COLLABORATOR = "COLLABORATOR"
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
  notificationsEnabled: boolean;
  env: { [key: string]: string };
  creator: User;
  creatorId: string;
  collaborators: Collaborator[];
  createdDate: Date;
  updatedDate: Date;

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
}

export enum PhpLogLevel {
  All = 'E_ALL',
  Warning = 'E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT',
  Error = 'E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED & ~E_STRICT',
  None = '~E_ALL',
}