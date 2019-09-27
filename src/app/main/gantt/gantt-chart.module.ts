import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttChartRoutingModule } from './gantt-chart-routing.module';
import { GanttChartComponent } from './gantt-chart.component';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { DatePipe } from '@angular/common';
import { TrnaslateLazyModule } from 'src/app/core/module/translate-lazy.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { FormsModule } from '@angular/forms';
import { PlanDefinitionComponent } from '../gantt/plan-definition/plan-definition.component';
import { PlanOrderComponent } from '../gantt/plan-order/plan-order.component';
import { GanttChartViewComponent } from '../gantt/gantt-chart-view/gantt-chart-view.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [GanttChartComponent, PlanDefinitionComponent, PlanOrderComponent, GanttChartViewComponent],
  imports: [
    CommonModule,
    GanttChartRoutingModule,
    SplitterModule,
    TrnaslateLazyModule,
    FlexLayoutModule,
    NotificationModule,
    FormsModule,
    DialogsModule,
    GridModule,
    ExcelModule,
  ],
  providers: [
    DatePipe
  ],
})
export class GanttChartModule { }
