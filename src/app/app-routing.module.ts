import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './components/init/init.component';

const routes: Routes = [
  { path: '', component: InitComponent },
  { path: 'user', loadChildren: () => import('./components/user/user.module')
                    .then(m => m.UserModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
