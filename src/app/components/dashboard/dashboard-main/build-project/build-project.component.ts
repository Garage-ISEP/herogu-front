import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContainerStatus, Origin, ProjectStatus, ProjectStatusResponse } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-build-project',
  templateUrl: './build-project.component.html',
  styleUrls: ['./build-project.component.scss']
})
export class BuildProjectComponent {
  
  @Input()
  public button = "";

  @Input()
  public disabled = false;

  @Input()
  public origin: Origin;

  @Input()
  public statusMap: Map<Origin, ProjectStatusResponse>;

  @Output()
  public readonly btnClick = new EventEmitter();

  public get loading() {
    return this.statusMap.get(this.origin).status === ProjectStatus.IN_PROGRESS || this.statusMap.get(this.origin).status === ContainerStatus.Restarting;
  }

}
