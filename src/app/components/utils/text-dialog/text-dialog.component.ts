import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html',
})
export class TextDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public text: string
  ) { }
}
