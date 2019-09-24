import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { TrnaslateLazyModule } from '../bom/translate-lazy.module';
import { SharedModules } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GenealogyComponent],
  imports: [
    GenealogyRoutingModule,
    SharedModules,
    TrnaslateLazyModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    TreeModule.forRoot()
  ],
  exports: [],
  providers: [],
})
export class GenealogyModule { }
