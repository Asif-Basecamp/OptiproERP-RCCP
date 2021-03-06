import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BOMRoutingModule } from './bom-routing.module';
import { BOMComponent } from './bom.component';
import { TrnaslateLazyModule } from 'src/app/core/module/translate-lazy.module';
import { FormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { BOMViewComponent } from './bom-view/bom-view.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModules } from 'src/app/core/shared.module';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { DatePipe } from '@angular/common';
//import { ItemCodeLookupComponent } from '../bom/item-code-lookup/item-code-lookup.component';

@NgModule({
  declarations: [BOMComponent, BOMViewComponent, WarehouseComponent],
  imports: [
    CommonModule,
    BOMRoutingModule,
    TrnaslateLazyModule,
    FormsModule,
    DateInputsModule,
    DialogsModule,
    GridModule,
    ExcelModule,
    TreeTableModule,
    NotificationModule,
    FlexLayoutModule,
    SharedModules,
    SplitterModule
  ],
  providers: [
    DatePipe
  ],
})
export class BOMModule { }
