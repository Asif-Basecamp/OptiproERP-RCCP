import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { BOMComponent } from './bom/bom.component';
import { GanttComponent } from './gantt/gantt.component';
import { GenealogyComponent } from './genealogy/genealogy.component';
import { ProductionComponent } from './production/production.component';

const routes: Routes = [
  { path: '', component: MainComponent,
  children: [
    {
      path: 'BOM',
      component: BOMComponent,
    },
    {
      path: 'gantt-chart',
      component: GanttComponent,
    },
    {
      path: 'genealogy',
      component: GenealogyComponent,
    }, 
    {
      path: 'production',
      component: ProductionComponent,
    },   
    {
      path: '',
      redirectTo: 'BOM',
      pathMatch: 'full',
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

