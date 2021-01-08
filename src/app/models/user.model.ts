export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  last_mail: number;
  mail: string;
  studentId: string;
  verified: boolean;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: Role;
  projects: Project[];
  collaboratorsProjetcs: CollaboratorsProjetc[];
}

export interface CollaboratorsProjetc {
  id: number;
  userId: number;
  name: string;
  docker_img_link: string;
  last_build: string;
  createdAt: string;
  updatedAt: string;
  Collaborator: Collaborator;
}

export interface Collaborator {
  id: number;
  userId: number;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  userId: number;
  name: string;
  docker_img_link: string;
  last_build: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePasswordModel {
  new_password: string;
  old_password: string;
  confirm_password: string;
}
