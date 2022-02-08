import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { NewPlayerComponent } from './new-player/new-player.component';

const routes: Routes = [
  { path: '', component: NewPlayerComponent },
  { path: 'init-count', component: InitialCounterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
