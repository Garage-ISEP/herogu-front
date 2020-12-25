import { ApiService } from './../../services/api.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthConnexionModel } from 'src/app/models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public isLoging: boolean = true;
}
