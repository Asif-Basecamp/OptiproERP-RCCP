import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BOMComponent } from './bom.component';

const routes: Routes = [
  { path: '', component: BOMComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BOMRoutingModule { }
