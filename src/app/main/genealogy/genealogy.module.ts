import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { TrnaslateLazyModule } from '../../core/module/translate-lazy.module';
import { SharedModules } from 'src/app/shared/shared.module';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [GenealogyComponent],
  imports: [
    GenealogyRoutingModule,
    SharedModules,
    TrnaslateLazyModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    SplitterModule,
    DialogModule,
    GridModule,
    ExcelModule,
    TreeModule.forRoot()
  ],
  exports: [],
  providers: [],
})
export class GenealogyModule { }
