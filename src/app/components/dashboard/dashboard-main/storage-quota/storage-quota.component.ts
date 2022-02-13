import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-storage-quota',
  templateUrl: './storage-quota.component.html',
  styleUrls: ['./storage-quota.component.scss']
})
export class StorageQuotaComponent implements OnInit {

  @Input()
  public project: Project;
  
  constructor() { }

  ngOnInit(): void {
  }

  public get quotaPercentage(): number {
    return Math.ceil((this.project.rwSize / this.project.maxRwSize) * 100)
  }

  public get usage(): string {
    return Math.ceil(this.project.rwSize / 1000000) + " MB";
  }

  public get quota(): string {
    return this.project.maxRwSize / 1000000 + " MB";
  }

  public get deleteDate(): string {
    if (!this.project.storageOverageDate)
      return "";
    return new Date(new Date(this.project.storageOverageDate).getTime() + 60_000 * 60 * 48).toLocaleString();
  }

}
