import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPlayerComponent } from './new-player/new-player.component';

const routes: Routes = [
  { path: '', component: NewPlayerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
