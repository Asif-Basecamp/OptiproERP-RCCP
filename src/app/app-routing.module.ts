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
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),    
    data: { showHeader: false, showSidebar: false, showFooter:false, compactLayout:false }
  },
  { path: '**', redirectTo: 'login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
