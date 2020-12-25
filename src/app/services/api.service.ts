import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _jwt: any;

  constructor() { }

  get logged(): boolean {
    return false;
  }
}
