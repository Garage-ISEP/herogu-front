import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  public value: number = 0;
  public mode: "determinate" | "indeterminate" = "indeterminate";
  public display: boolean = false;
}
