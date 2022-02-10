import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { SharedModule } from '../shared/shared.module';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ShowQuizComponent } from './show-quiz/show-quiz.component';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListQuizComponent,
    CreateQuizComponent,
    CreateQuestionsComponent,
    ListQuestionsComponent,
    ShowQuizComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
