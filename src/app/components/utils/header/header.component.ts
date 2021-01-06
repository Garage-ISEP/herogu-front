import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../services/progress.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //TODO: Get Username

  public dispAccountIcon: boolean;

  public username = "Théodore Prévot";

  public displayProgress: boolean = false;

  constructor(
    public readonly apiService: ApiService,
    public readonly progressService: ProgressService,
  ) {}
}
