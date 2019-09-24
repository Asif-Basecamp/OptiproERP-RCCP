import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenealogyComponent } from './genealogy.component';

const routes: Routes = [
  { path: '', component: GenealogyComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenealogyRoutingModule { }
