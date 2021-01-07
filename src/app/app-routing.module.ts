import { ProjectGuardService } from './services/project-guard.service';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeauthGuardService } from './services/deauth-guard.service';
import { VerifyEmailComponent } from './components/utils/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [AuthGuardService, ProjectGuardService] },
  { path: "verify", component: VerifyEmailComponent},
  { path: "auth", component: AuthComponent, canActivate: [DeauthGuardService]},
  { path: "account", component: AccountComponent, canActivate: [AuthGuardService] },
  { path: "project/create", component: CreateProjectComponent, canActivate: [AuthGuardService, ProjectGuardService] },
  { path: "project/:id", component: DashboardComponent, canActivate: [AuthGuardService, ProjectGuardService] },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
