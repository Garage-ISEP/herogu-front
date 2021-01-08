import { DeauthGuardService } from './services/deauth-guard.service';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { ProjectsComponent } from './components/projects/projects.component';
import { AccountComponent } from './components/account/account.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { TextDialogComponent } from './components/utils/text-dialog/text-dialog.component';
import { PasswordDialogComponent } from './components/utils/password-dialog/password-dialog.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AddStudentComponent } from "./components/utils/add-student/add-student.component";
import { VerifyEmailComponent } from './components/utils/verify-email/verify-email.component';
import { PrismService } from './services/prism.service';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsComponent,
    AccountComponent,
    HeaderComponent,
    TextDialogComponent,
    PasswordDialogComponent,
    CreateProjectComponent,
    VerifyEmailComponent,
    AddStudentComponent
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
    MatSnackBarModule,
    HttpClientModule,
    RecaptchaV3Module,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    YouTubePlayerModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  providers: [
    AuthGuardService,
    DeauthGuardService,
    PrismService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.captcha
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
