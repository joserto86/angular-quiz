import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { Response } from 'src/app/models/response';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})
export class DoQuizComponent implements OnInit {

  quiz!: Quiz;
  player:string = '';
  
  constructor(private responseQuizService: ResponseQuizService, private router: Router) { }

  ngOnInit(): void {
    this.player = this.responseQuizService.playerName;
    this.quiz = this.responseQuizService.currentQuiz;
    this.validateRefresh();
  }

  validateRefresh() {
    if(this.quiz === undefined) {
      this.router.navigate(['/']);
    }
  }

  getSeconds():number {
    return this.quiz?.questions[0].seconds;
  }

  getTitle():string {
    return this.quiz.questions[0].title;
  }

  getResponses():Response[] {
    return this.quiz.questions[0].responses;
  }
 
}
