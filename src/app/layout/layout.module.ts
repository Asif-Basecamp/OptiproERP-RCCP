import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MenuModule } from '@progress/kendo-angular-menu';
import { HeaderComponent } from './header/header.component';
import { LeftComponent } from './left/left.component';
import { TrnaslateLazyModule } from '../core/modules/translate-lazy.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MenuModule,
    TrnaslateLazyModule
  ],
  exports: [
    HeaderComponent,
    LeftComponent
  ],
  declarations: [
    HeaderComponent,
    LeftComponent
  ]
})

export class LayoutModule { }
