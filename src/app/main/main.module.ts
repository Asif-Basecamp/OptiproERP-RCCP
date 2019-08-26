import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { BOMComponent } from './bom/bom.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserAuthorizationComponent } from './user-authorization/user-authorization.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';


@NgModule({
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    FormsModule,
    DialogsModule,
    DropDownsModule,
    MainRoutingModule,
    FlexLayoutModule,
    DateInputsModule  
  ],
  declarations: [MainComponent, BOMComponent, UserManagementComponent, UserAuthorizationComponent, UserRolesComponent, ConnectedUsersComponent]
})
export class MainModule { }
