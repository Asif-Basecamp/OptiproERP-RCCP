import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BOMComponent } from './bom/bom.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full'},
  { path: 'default', component: MainComponent },
  { path: 'BOM',  pathMatch: 'full', component: BOMComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
