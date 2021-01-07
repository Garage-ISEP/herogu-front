import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProgressService } from './../../services/progress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    public progressService: ProgressService,
    public apiService: ApiService,
    public router: Router
  ) { }

  async ngOnInit() {
    await this.apiService.loadUserData();
  }
}
