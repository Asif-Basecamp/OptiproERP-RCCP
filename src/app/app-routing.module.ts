import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'    
  },  
  { path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),   
    data: { showHeader: true, showSidebar: true, showFooter:false, compactLayout:false }
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),    
    data: { showHeader: false, showSidebar: false, showFooter:false, compactLayout:false }
  },
  {
    path: 'BOM',
    loadChildren: () => import('./main/bom/bom.module').then(m => m.BOMModule),     
    data: { showHeader: true, showSidebar: true, showFooter:false, compactLayout:false }
  },
  {
    path: 'gantt-chart',
    loadChildren: () => import('./main/gantt/gantt-chart.module').then(m => m.GanttChartModule),     
    data: { showHeader: true, showSidebar: true, showFooter:false, compactLayout:false }
  },
  {
    path: 'genealogy',
    loadChildren: () => import('./main/genealogy/genealogy.module').then(m => m.GenealogyModule),     
    data: { showHeader: true, showSidebar: true, showFooter:false, compactLayout:false }
  },
  {
    path: 'production',
    loadChildren: () => import('./main/production/production.module').then(m => m.ProductionModule),     
    data: { showHeader: true, showSidebar: true, showFooter:false, compactLayout:false }
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
