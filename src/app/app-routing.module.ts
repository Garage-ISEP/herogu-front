import { ProjectsComponent } from './components/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeauthGuardService } from './services/deauth-guard.service';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [AuthGuardService] },
  { path: "auth", component: AuthComponent, canActivate: [DeauthGuardService]},
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
