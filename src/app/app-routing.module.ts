import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AccountComponent } from './components/account/account.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyEmailComponent } from './components/utils/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: "verify", component: VerifyEmailComponent},
  { path: "auth", component: AuthComponent},
  { path: "account", component: AccountComponent },
  { path: "project/create", component: CreateProjectComponent },
  { path: "project/:id", component: DashboardComponent },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
