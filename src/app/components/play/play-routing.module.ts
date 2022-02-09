import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResponseComponent } from '../shared/user-response/user-response.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { NewPlayerComponent } from './new-player/new-player.component';

const routes: Routes = [
  { path: '', component: NewPlayerComponent },
  { path: 'init-count', component: InitialCounterComponent },
  { path: 'do-quiz', component: DoQuizComponent },
  { path: 'user-response/:id', component: UserResponseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
