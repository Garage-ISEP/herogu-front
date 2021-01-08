import { ProgressService } from '../../../services/progress.service';
import { ApiService } from 'src/app/services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public readonly apiService: ApiService,
    public readonly progressService: ProgressService,
  ) {}
}
