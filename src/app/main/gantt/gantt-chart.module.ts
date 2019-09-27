import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttChartRoutingModule } from './gantt-chart-routing.module';
import { GanttChartComponent } from './gantt-chart.component';

@NgModule({
  declarations: [GanttChartComponent],
  imports: [
    CommonModule,
    GanttChartRoutingModule
  ],
  providers: [],
})
export class GanttChartModule { }
