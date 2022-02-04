import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {

  id: string = '';
  loading: boolean = false;
  currentQuiz: Quiz | undefined;
  
  constructor(private quizService: QuizService, private activateRoute: ActivatedRoute) 
  {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.getQuiz();
  }

  getQuiz() {
    this.loading = true;
    this.quizService.getQuiz(this.id).subscribe(doc => {
      this.currentQuiz = doc.data();
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

}
