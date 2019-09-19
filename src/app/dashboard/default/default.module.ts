import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
})
export class DefaultModule { }
