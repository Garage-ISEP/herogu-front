import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from "@angular/cdk/clipboard";

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { ProjectsComponent } from './components/projects/projects.component';
import { AccountComponent } from './components/account/account.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { TextDialogComponent } from './components/utils/text-dialog/text-dialog.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AddStudentComponent } from "./components/utils/add-student/add-student.component";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appearance } from './style/default';
import { ProjectCreationInfosComponent } from './components/create-project/project-creation-infos/project-creation-infos.component';
import { CreateProjectInfoComponent } from './components/create-project/project-creation-infos/create-project-info/create-project-info.component';
import { DashboardHeaderComponent } from './components/dashboard/dashboard-header/dashboard-header.component';
import { ProjectStatusComponent } from './components/dashboard/dashboard-header/project-status/project-status.component';
import { DashboardSettingsComponent } from './components/dashboard/dashboard-settings/dashboard-settings.component';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { BuildProjectComponent } from './components/dashboard/dashboard-main/build-project/build-project.component';
import { MysqlCredsComponent } from './components/dashboard/dashboard-main/mysql-creds/mysql-creds.component';
import { PhpConfigComponent } from './components/dashboard/dashboard-main/php-config/php-config.component';
import { NginxConfigComponent } from './components/dashboard/dashboard-main/nginx-config/nginx-config.component';
import { EnvConfigComponent } from './components/dashboard/dashboard-main/env-config/env-config.component';
import { EnvPairComponent } from './components/dashboard/dashboard-main/env-config/env-pair/env-pair.component';
import { StorageQuotaComponent } from './components/dashboard/dashboard-main/storage-quota/storage-quota.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    ProjectsComponent,
    AccountComponent,
    HeaderComponent,
    TextDialogComponent,
    CreateProjectComponent,
    AddStudentComponent,
    ProjectCreationInfosComponent,
    CreateProjectInfoComponent,
    DashboardHeaderComponent,
    ProjectStatusComponent,
    DashboardSettingsComponent,
    DashboardMainComponent,
    BuildProjectComponent,
    MysqlCredsComponent,
    PhpConfigComponent,
    NginxConfigComponent,
    EnvConfigComponent,
    EnvPairComponent,
    StorageQuotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    RecaptchaV3Module,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTooltipModule,
    ClipboardModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.captcha
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
