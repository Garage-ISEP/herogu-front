import { ApiService } from 'src/app/services/api.service';
import { NavigationEnd, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //TODO: Get Username

  public dispAccountIcon: boolean;

  public username = "Théodore Prévot";

  constructor(private readonly apiService: ApiService) {
    this.dispAccountIcon = this.apiService.logged;
  }
}
