import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewPlayerComponent } from './new-player/new-player.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';


@NgModule({
  declarations: [
    NewPlayerComponent,
    InitialCounterComponent,
    DoQuizComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule
  ]
})
export class PlayModule { }
