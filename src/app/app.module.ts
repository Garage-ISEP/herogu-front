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
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { ProjectsComponent } from './components/projects/projects.component';
import { AccountComponent } from './components/account/account.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { TextDialogComponent } from './components/utils/text-dialog/text-dialog.component';
import { PasswordDialogComponent } from './components/utils/password-dialog/password-dialog.component';
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
    PasswordDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    HttpClientModule,
    RecaptchaV3Module,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    AuthGuardService,
    DeauthGuardService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.captcha
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
