import { Project } from './../../models/user.model';
import { ProgressService } from './../../services/progress.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { CreateProjectModel } from 'src/app/models/api/project.model';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  public infosForm: FormGroup;
  public configForm: FormGroup;
  public webhookForm: FormGroup;

  public addedUsers: string[] = [];
  public videoConfig: { w: number, h: number };
  public dockerfile: string;

  @ViewChild("stepper")
  private stepper: MatVerticalStepper;

  @ViewChild("checkManifestBtn")
  private checkManifestBtn: MatButton;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private progress: ProgressService
  ) { }

  ngOnInit(): void {
    this.processVideoConfig();
    window.addEventListener("resize", () => this.processVideoConfig());
    this.initYt();

    this.infosForm = this.formBuilder.group({
      projectName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.pattern('^((?!create).)*$')]],
      enablePHP: ['true'],
      enableMysql: ['true'],
    });
    this.configForm = this.formBuilder.group({
      tagName: ['', [Validators.required]],
    }, { asyncValidators: (control) => this.verifyManifest(control), updateOn: 'submit' });
    this.webhookForm = this.formBuilder.group({
      enableNotifications: ['true']
    });
  }

  public async verifyManifest(manifest: AbstractControl): Promise<ValidationErrors> {
    if (manifest instanceof FormGroup) {
      this.progress.toggle();
      const button: HTMLButtonElement = this.checkManifestBtn._elementRef.nativeElement;
      button.innerText = "Vérification...";
      button.disabled = true;
      const value = manifest?.get("tagName")?.value ?? manifest?.value;
      try {
        await this.api.getRequest(`/projects/manifest/${encodeURIComponent(value)}`);
        button.innerText = "Suivant";
        button.disabled = false;
        this.progress.toggle();
        return;
      } catch (e) {
        this.api.snack(`Le repository ${value} n'existe pas sur DockerHub ! Vérifiez les configurations et les builds...`, 4000);
        this.progress.toggle();
        button.innerText = "Suivant";
        button.disabled = false;
        return {
          verifyManifest: {
            valid: false
          }
        }
      }
    }
  }

  public async getDockerfile(usePhp: boolean) {
    this.dockerfile = `FROM garageisep/herogu:${usePhp ? 'php' : 'nginx'}\nCOPY . /var/www/html/`;
  }

  public async createProject() {
    const project: CreateProjectModel = {
      name: this.infosForm.get("projectName").value,
      enableMysql: this.infosForm.get("enableMysql").value === "true",
      users: this.addedUsers,
      tag: this.configForm.get("tagName").value,
      enableNotifications: this.webhookForm.get("enableNotifications").value === 'true'
    }
    //TODO: Create project
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
