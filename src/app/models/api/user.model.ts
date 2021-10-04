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
  shas?: string[];
  repoId: number;
  type: ProjectType;
  mysqlUser: string;
  mysqlPassword: string;
  mysqlDatabase: string;
  mysqlEnabled: boolean;
  notificationsEnabled: boolean;
  env: { [key: string]: string };
  accessToken: string;
  creator: User;
  creatorId: string;
  collaborators: Collaborator[];
  createdDate: Date;
  updatedDate: Date;
}