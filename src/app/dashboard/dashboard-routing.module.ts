import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ 
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'Default', pathMatch: 'full' }, 
      { 
        path: 'Default',
        loadChildren: './default/default.module#DefaultModule', data: { preload: true }
      },
      { 
        path: 'Genealogy',
        loadChildren: './genealogy/genealogy.module#GenealogyModule', data: { preload: true }
      },
      { 
        path: 'Production',
        loadChildren: './production/production.module#ProductionModule', data: { preload: true }
      },
      { 
        path: 'BOM',
        loadChildren: './bom/bom.module#BOMModule', data: { preload: true }
      },
      { 
        path: 'Gantt-Chart',
        loadChildren: './gantt-chart/gantt-chart.module#GanttChartModule', data: { preload: true }
      },
      {
        path: '**',
        redirectTo: 'Default'
    }] 
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
