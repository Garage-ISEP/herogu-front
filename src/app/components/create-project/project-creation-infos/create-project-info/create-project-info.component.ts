import { Component, Input, OnInit } from '@angular/core';
import { LoadingState } from '../project-creation-infos.component';

@Component({
  selector: 'app-create-project-info',
  templateUrl: './create-project-info.component.html',
  styleUrls: ['./create-project-info.component.scss']
})
export class CreateProjectInfoComponent {

  @Input()
  public state?: LoadingState;

  @Input()
  public error?: string;

}
