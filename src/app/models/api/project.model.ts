import { FormGroup } from "@angular/forms";

export class CreateProjectRequest {

  public projectName: string;
  public enablePHP: "true" | "false";
  public enableMysql: "true" | "false";
  public enableNotifications: "true" | "false";
  public addedUsers: string[];
  public githubLink: string;
  public accessToken: string;

  constructor(infosForm: FormGroup, configForm: FormGroup, public env: { [key: string]: string }) {
    Object.assign(this, infosForm.value, configForm.value);
  }
}
export class PostProjectRequest {

  public name: string;
  public githubLink: string;
  public type: "nginx" | "php";
  public mysqlEnabled = false;
  public notificationsEnabled = false;
  public addedUsers: string[];

  constructor(createProject: CreateProjectRequest) {
    this.name = createProject.projectName;
    this.githubLink = createProject.githubLink;
    this.type = createProject.enablePHP == "true" ? "php" : "nginx";
    this.mysqlEnabled = createProject.enableMysql == "true";
    this.notificationsEnabled = createProject.enableNotifications == "true";
    this.addedUsers = createProject.addedUsers;
  }
}

export class GithubLinkRequest {
  public accessToken: string;

  constructor(createProject: CreateProjectRequest) {
    this.accessToken = createProject.accessToken;
  }
}