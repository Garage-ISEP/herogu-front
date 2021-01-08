import { HttpClient } from '@angular/common/http';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  public infosForm: FormGroup;
  public configForm: FormGroup;
  public addedUsers: string[] = [];
  public videoConfig: { w: number, h: number };

  @ViewChild("stepper")
  private stepper: MatVerticalStepper;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.processVideoConfig();
    window.addEventListener("resize", () => this.processVideoConfig());
    this.initYt();
    this.configForm = this.formBuilder.group({
      tagName: ['', [Validators.required]],
    });
    this.infosForm = this.formBuilder.group({
      projectName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      enableMysql: ['true']
    });
  }

  public async verifyManifest(repo: string) {
    try {
      await this.api.getRequest(`/projects/manifest/${encodeURIComponent(repo)}`);
      this.stepper.next();
    } catch (e) {
      this.api.snack(`Le repository ${repo} n'existe pas sur DockerHub !`);
    }
  }

  private initYt() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  private processVideoConfig() {
    this.videoConfig = {
      w: window.innerWidth - (window.innerWidth / 8) > 500 ? 500 : window.innerWidth - (window.innerWidth / 8),
      h: window.innerWidth - (window.innerWidth / 8) > 500 ? 500 * (3/4) : (window.innerWidth - (window.innerWidth / 10)) * (3 / 4)
    };
  }


}
