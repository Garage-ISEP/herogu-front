export interface CreateProjectModel {
  name: string;
  enableMysql: boolean;
  users: string[];
  tag: string;
  enableNotifications: boolean;
}
