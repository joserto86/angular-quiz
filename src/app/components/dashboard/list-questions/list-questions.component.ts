import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { Question} from '../../../models/question'

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  questionList: Question[] = [];
  loading: boolean = false;

  constructor(private quizService: QuizService, 
              private router:Router,
              private toastr: ToastrService
  ) {
    this.quizService.getQuestions().subscribe(data => {
      this.questionList.push(data);
    });
   }

  ngOnInit(): void {
    if (this.quizService.quizTitle === '' || this.quizService.quizDesc === '') {
      this.router.navigate(['/dashboard']);
    }
  }

  removeQuestion(index:number) {
    this.questionList.splice(index, 1);
  }

  finishQuiz() {

    let user: User = JSON.parse(localStorage.getItem('user') || '{}') as User

    const quiz: Quiz = new Quiz(
      user.uid,
      this.quizService.quizTitle, 
      this.quizService.quizDesc, 
      this.generateCode(),
      this.questionList
    );

    this.loading = true;

    this.quizService.createQuiz(quiz).then(data => {
      this.toastr.success('Cuestionario creado exitosamente', 'Nuevo cuestionario registrado');
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  private generateCode():string {
    return nanoid(6).toUpperCase();
  }

}
