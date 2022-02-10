import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResponseComponent } from '../shared/user-response/user-response.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { ShowQuizComponent } from './show-quiz/show-quiz.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '', component: ListQuizComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'create-question', component: CreateQuestionsComponent },
  { path: 'show-quiz/:id', component: ShowQuizComponent },
  { path: 'statistics/:id', component: StatisticsComponent },
  { path: 'response/:id', component: UserResponseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
