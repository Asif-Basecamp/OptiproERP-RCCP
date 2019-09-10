import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ItemCodeLookupComponent } from './bom/item-code-lookup/item-code-lookup.component';
import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TrnaslateLazyModule } from './bom/translate-lazy.module';
import { CountdownModule } from 'ngx-countdown';
import { DatePipe } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { BOMComponent } from './bom/bom.component';
import { BOMGridViewComponent } from './bom/bom-grid-view/bom-grid-view.component';
import { WarehouseCodeLookupComponent } from './bom/warehouse-code-lookup/warehouse-code-lookup.component';
import { GanttChartComponent } from './gantt/gantt-chart.component';
import { GanttChartViewComponent } from './gantt/gantt-chart-view/gantt-chart-view.component';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    FormsModule,
    DialogsModule,
    DropDownsModule,
    MainRoutingModule,
    FlexLayoutModule,
    DateInputsModule,
    TreeTableModule,
    NotificationModule,
    TrnaslateLazyModule,
    CountdownModule,
  ],
  providers: [
    DatePipe
  ],
  declarations: [MainComponent, BOMComponent, BOMGridViewComponent, ItemCodeLookupComponent, WarehouseCodeLookupComponent, GanttChartComponent, GanttChartViewComponent]
})
export class MainModule { }