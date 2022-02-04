import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitComponent } from './components/init/init.component';

const routes: Routes = [
  { path: '', component: InitComponent },
  { path: 'user', loadChildren: () => import('./components/user/user.module')
    .then(m => m.UserModule) 
  },

  { path: 'dashboard', component: DashboardComponent, 
    loadChildren: () => import('./components/dashboard/dashboard.module')
      .then(m => m.DashboardModule) 
  },

  { path: 'play', loadChildren: () => import('./components/play/play.module')
      .then(m => m.PlayModule) 
  },

  { path: '**', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
