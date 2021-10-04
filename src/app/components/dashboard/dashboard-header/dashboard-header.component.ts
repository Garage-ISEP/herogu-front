import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/api/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input()
  public project: Project;

  constructor(
    private readonly _api: ApiService,
  ) { }

  public async ngOnInit() {
  }

}
