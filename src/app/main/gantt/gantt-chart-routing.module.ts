import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GanttChartComponent } from './gantt-chart.component';

const routes: Routes = [
  { path: '', component: GanttChartComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttChartRoutingModule { }
