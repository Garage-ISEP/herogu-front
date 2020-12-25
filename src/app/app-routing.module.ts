import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: "auth", component: AuthComponent },
  { path: "**", redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
