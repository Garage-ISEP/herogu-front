import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-env-pair',
  templateUrl: './env-pair.component.html',
  styleUrls: ['./env-pair.component.scss']
})
export class EnvPairComponent {

  @Input()
  public key: string;

  @Output()
  public readonly keyChange = new EventEmitter();

  @Input()
  public value: string;

  @Output()
  public readonly valueChange = new EventEmitter();

  @Output()
  public readonly remove = new EventEmitter();

  @Input()
  public disabled = false;

}
