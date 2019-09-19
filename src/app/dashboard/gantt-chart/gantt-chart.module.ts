import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttChartRoutingModule } from './gantt-chart-routing.module';
import { GanttChartComponent } from './gantt-chart.component';
import { TrnaslateLazyModule } from 'src/app/core/modules/translate-lazy.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GanttChartComponent],
  imports: [
    CommonModule,
    GanttChartRoutingModule,
    TrnaslateLazyModule,
    FormsModule
  ],
  providers: [],
})
export class GanttChartModule { }
