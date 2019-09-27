import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { BOMComponent } from './bom/bom.component';
//import { GanttChartComponent } from './gantt/gantt-chart.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
 // { path: 'BOM',  pathMatch: 'full', component: BOMComponent },
  //{ path: 'gantt-chart',  pathMatch: 'full', component: GanttChartComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

