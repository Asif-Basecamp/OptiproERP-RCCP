import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BOMComponent } from './bom/bom.component';
import { GanttChartComponent } from './gantt/gantt-chart.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full'},
  { path: 'default', component: MainComponent },
  { path: 'BOM',  pathMatch: 'full', component: BOMComponent },
  { path: 'gantt-chart',  pathMatch: 'full', component: GanttChartComponent },
  {
    path: 'genealogy',
    loadChildren: () => import('./genealogy/genealogy.module').then(m => m.GenealogyModule),     
    data: { showHeader: false, showSidebar: false, showFooter:false, compactLayout:false }
  },
  {
    path: 'production',
    loadChildren: () => import('./production/production.module').then(m => m.ProductionModule),     
    data: { showHeader: false, showSidebar: false, showFooter:false, compactLayout:false }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

