import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { ItemCodeLookupComponent } from '../dashboard/item-code-lookup/item-code-lookup.component';
import { TrnaslateLazyModule } from './modules/translate-lazy.module';

@NgModule({
  declarations: [
    ItemCodeLookupComponent
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    TrnaslateLazyModule,
    FlexLayoutModule,
    DialogsModule,
    GridModule,
    ExcelModule,
    FormsModule
  ],
  exports: [ItemCodeLookupComponent],
  providers: [],
  bootstrap: []
})
export class SharedModules { }
