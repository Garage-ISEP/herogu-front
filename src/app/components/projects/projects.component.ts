import { ProgressService } from './../../services/progress.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private _progressService: ProgressService
  ) { }

  ngOnInit(): void {
  }

}
