import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { TrnaslateLazyModule } from 'src/app/core/modules/translate-lazy.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModules } from 'src/app/core/shared.module';
import { AngularSplitModule } from 'angular-split';
import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule, PDFModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [ProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    TrnaslateLazyModule,
    FlexLayoutModule,
    FormsModule,
    SharedModules,
    AngularSplitModule.forRoot(),
    TreeTableModule,
    DateInputsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    DialogModule,
    ToastrModule.forRoot()
  ],
  providers: [],
})
export class ProductionModule { }
