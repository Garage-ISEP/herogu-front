import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  public value: number = 0;
  public mode: "determinate" | "indeterminate" = "indeterminate";
  private display: boolean = false;

  public subject = new Subject<boolean>(); 

  public toggle(mode?: "determinate" | "indeterminate") {
    this.display = !this.display;
    this.mode ??= mode;
    this.subject.next(this.display);
  }

  public show(mode?: "determinate" | "indeterminate") {
    this.display = true;
    this.mode ??= mode;
    this.subject.next(true);
  }

  public hide(mode?: "determinate" | "indeterminate") {
    this.display = false;
    this.mode ??= mode;
    this.subject.next(false);
  }
}
