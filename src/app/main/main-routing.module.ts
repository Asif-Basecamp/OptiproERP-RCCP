import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BOMComponent } from './bom/bom.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full'},
  { path: 'default', component: MainComponent },
  { path: 'BOM',  pathMatch: 'full', component: BOMComponent },
  // { path: 'user-management',  pathMatch: 'full', component: UserManagementComponent },
  // { path: 'roles',  pathMatch: 'full', component: UserRolesComponent },
  // { path: 'authorization',  pathMatch: 'full', component: UserAuthorizationComponent },
  // { path: 'connected-users',  pathMatch: 'full', component: ConnectedUsersComponent },
  // { path: 'user-management',  pathMatch: 'full', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
