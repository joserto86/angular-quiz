import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuizComponent } from './list-quiz/list-quiz.component';

const routes: Routes = [
  { path: '', component: ListQuizComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'create-question', component: CreateQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
