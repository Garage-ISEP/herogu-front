import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [LoggedGuard] },
  { path: "auth", component: AuthComponent},
  { path: "account", component: AccountComponent, canActivate: [LoggedGuard] },
  { path: "project/create", component: CreateProjectComponent, canActivate: [LoggedGuard] },
  { path: "project/:id", component: DashboardComponent, canActivate: [LoggedGuard] },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
