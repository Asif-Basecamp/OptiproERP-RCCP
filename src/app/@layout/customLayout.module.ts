import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MenuModule } from '@progress/kendo-angular-menu';
import { TrnaslateLazyModule } from '../core/module/translate-lazy.module';

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
    SidebarComponent
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent
  ]
})
export class CustomLayoutModule { }
