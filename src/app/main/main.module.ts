import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { SplitterModule, TabStripModule } from '@progress/kendo-angular-layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { TrnaslateLazyModule } from '../core/module/translate-lazy.module';
import { CountdownModule } from 'ngx-countdown';
import { DatePipe } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BOMComponent } from './bom/bom.component';
import { SharedModules } from 'src/app/core/shared.module';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BOMViewComponent } from './bom/bom-view/bom-view.component';
import { GanttComponent } from './gantt/gantt.component';
import { GenealogyComponent } from './genealogy/genealogy.component';
import { ProductionComponent } from './production/production.component';
import { GanttViewComponent } from './gantt/gantt-view/gantt-view.component';
import { PlanDefinitionComponent } from './gantt/plan-definition/plan-definition.component';
import { PlanOrderComponent } from './gantt/plan-order/plan-order.component';
import { TreeModule } from 'angular-tree-component';
import { LookupComponent } from './lookup/lookup.component';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    FormsModule,
    DialogsModule,
    DropDownsModule,
    MainRoutingModule,
    SplitterModule,
    FlexLayoutModule,
    DateInputsModule,
    TreeTableModule,
    NotificationModule,
    TrnaslateLazyModule,
    CountdownModule,
    SharedModules,
    TreeModule.forRoot(),
    TabStripModule
  ],
  providers: [
    DatePipe
  ],
  declarations: [MainComponent, LookupComponent, PlanDefinitionComponent, PlanOrderComponent, GanttViewComponent, BOMComponent, GanttComponent, GenealogyComponent, ProductionComponent, WarehouseComponent, BOMViewComponent]
})
export class MainModule { }
