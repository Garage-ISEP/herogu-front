import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthConnexionModel } from 'src/app/models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public connexionData: AuthConnexionModel = {
    code: '',
    password: ''
  };

  constructor(
    private readonly _apiService: ApiService
  ) { }
}
