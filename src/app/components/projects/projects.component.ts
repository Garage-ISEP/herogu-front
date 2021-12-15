import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private readonly _api: ApiService,
  ) { }

  async ngOnInit() {
    await this._api.loadUser();
  }

  public get user() {
    return this._api.user;
  }
}
