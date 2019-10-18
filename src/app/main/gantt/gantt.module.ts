import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttRoutingModule } from './gantt-routing.module';
import { GanttComponent } from './gantt.component';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { DatePipe } from '@angular/common';
import { TrnaslateLazyModule } from 'src/app/core/module/translate-lazy.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { FormsModule } from '@angular/forms';
import { PlanDefinitionComponent } from '../gantt/plan-definition/plan-definition.component';
import { PlanOrderComponent } from '../gantt/plan-order/plan-order.component';
import { GanttViewComponent } from './gantt-view/gantt-view.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [GanttComponent, PlanDefinitionComponent, PlanOrderComponent, GanttViewComponent],
  imports: [
    CommonModule,
    GanttRoutingModule,
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
