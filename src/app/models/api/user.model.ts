import { BaseModel } from "../base.model";

export class User extends BaseModel {
  public id: string;
  public firstName: string;
  public lastName: string;
  public mail: string;
  public studentId: string;
  public admin: boolean;
  public role: Role;
  public collaborators: Collaborator[];
  public createdDate: Date;
  public updatedDate: Date;

  public get projects() {
    return this.collaborators.map(el => el.project) || [];
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
  id: number;
  userId: number;
  name: string;
  docker_img_link: string;
  last_build: string;
  createdAt: string;
  updatedAt: string;
}