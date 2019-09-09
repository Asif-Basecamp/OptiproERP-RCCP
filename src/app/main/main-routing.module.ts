import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BOMComponent } from './bom/bom.component';
import { MainComponent } from './main.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full'},
  { path: 'default', component: MainComponent },
  { path: 'BOM',  pathMatch: 'full', component: BOMComponent },
  { path: 'Gantt-Chart',  pathMatch: 'full', component: GanttChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
