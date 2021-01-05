import { ProjectModel } from './../../models/project.model';
import { ApiService } from 'src/app/services/api.service';
import { ProgressService } from './../../services/progress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: ProjectModel[] = [];
  constructor(
    public progressService: ProgressService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      this.projects.push({
        author: "Théodore",
        name: "My PHP Project",
        admin: false
      });
    }
    // this.loadProjects();
  }

  private async loadProjects() {
    this.progressService.toggle("indeterminate");
    try {
      const res = await this.apiService.getRequest<ProjectModel>("/projects");
    } catch (e) {
      console.error(e);
    }
  }

}
