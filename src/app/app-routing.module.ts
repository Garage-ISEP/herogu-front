import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';
import { ProjectGuard } from './guards/project.guard';
import { DashboardSettingsComponent } from './components/dashboard/dashboard-settings/dashboard-settings.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [LoggedGuard] },
  { path: "auth", component: AuthComponent},
  { path: "account", component: AccountComponent, canActivate: [LoggedGuard] },
  { path: "project/create", component: CreateProjectComponent, canActivate: [LoggedGuard] },
  {
    path: "project/:id", component: DashboardComponent, canActivate: [LoggedGuard, ProjectGuard], children: [
      { path: "", component: DashboardMainComponent },
      { path: "settings", component: DashboardSettingsComponent },
    ]
  },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
