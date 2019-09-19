import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'Auth/Signin', pathMatch: 'full' },
  { path: 'Auth/Signin', component: SigninComponent },
  { path: 'Dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { preload: true } },
  { path: '**', redirectTo: 'Auth/Signin' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
