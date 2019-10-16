import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { SplitterModule } from '@progress/kendo-angular-layout';
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
    CountdownModule
  ],
  providers: [
    DatePipe
  ],
  declarations: [MainComponent]
})
export class MainModule { }
