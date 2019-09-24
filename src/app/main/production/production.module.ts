import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule, PDFModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { TrnaslateLazyModule } from '../bom/translate-lazy.module';
import { SharedModules } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    TrnaslateLazyModule,
    FlexLayoutModule,
    FormsModule,
    SharedModules,
    TreeTableModule,
    DateInputsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    DialogModule
  ],
  providers: [],
})
export class ProductionModule { }
