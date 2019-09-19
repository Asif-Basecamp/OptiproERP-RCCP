import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenealogyRoutingModule } from './genealogy-routing.module';
import { GenealogyComponent } from './genealogy.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModules } from 'src/app/core/shared.module';
import { TrnaslateLazyModule } from 'src/app/core/modules/translate-lazy.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [GenealogyComponent],
  imports: [
    GenealogyRoutingModule,
    SharedModules,
    TrnaslateLazyModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    AngularSplitModule.forRoot(),
    TreeModule.forRoot()
  ],
  exports: [],
  providers: [],
})
export class GenealogyModule { }
