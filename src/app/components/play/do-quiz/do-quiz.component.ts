import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { Response } from 'src/app/models/response';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})
export class DoQuizComponent implements OnInit, OnDestroy {

  quiz!: Quiz;
  player:string = '';
  questionIndex:number = 0;
  seconds:number = 0;
  setInterval:any;

  optionSelected:any;
  selectedIndex:any;

  correctQuantity:number = 0;
  inCorrectQuantity:number = 0;
  totalPoints:number = 0;
  userResponses:any[] = [];
  
  constructor(private responseQuizService: ResponseQuizService, private router: Router) { }

  ngOnInit(): void {
    this.player = this.responseQuizService.playerName;
    this.quiz = this.responseQuizService.currentQuiz;
    this.validateRefresh();
    this.initCounter();
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  validateRefresh() {
    if(this.quiz === undefined) {
      this.router.navigate(['/']);
    }
  }

  getSeconds():number {
    return this.seconds;
  }

  getQuestionTitle():string {
    return this.quiz?.questions[this.questionIndex].title;
  }

  getQuestionResponses():Response[] {
    return this.quiz?.questions[this.questionIndex].responses;
  }

  getQuestionPoints():number {
    return this.quiz?.questions[this.questionIndex].points;
  }

  getQuestionSeconds():number {
    return this.quiz?.questions[this.questionIndex].seconds;
  }


  initCounter() {
    this.seconds = this.getQuestionSeconds();

    this.setInterval = setInterval(() => {
      if (this.seconds === 0) {
        this.addResponse();
      }

      this.seconds --;
    }, 1000);
  }

  selectedResponse(response:Response, index:number) {
    this.selectedIndex = index;
    this.optionSelected = response;
  }

  addClassOption(response:Response):string {
    if (response === this.optionSelected) {
      return 'selected';
    } else {
      return '';
    }
  }

  nextQuestion() {
    clearInterval(this.setInterval);
    this.addResponse();
    this.initCounter();
  }

  private addResponse() {

    this.countCorrectAndIncorrect();

    const currentResponse = {
      title: this.getQuestionTitle(),
      points: this.getCurrentQuestionPoints(),
      seconds: this.getCurrentQuestionSeconds(),
      indexResponse: this.getSelectedIndex,
      reponses: this.getQuestionResponses()
    }

    this.userResponses.push(currentResponse);

    this.optionSelected = undefined
    this.selectedIndex = undefined;

    if (this.quiz.questions.length - 1 === this.questionIndex) {
      this.saveUserResponses();
      this.router.navigate(['/play/user-response']);
    } else {
      this.questionIndex ++;
      this.seconds = this.getQuestionSeconds();
    }
  }

  private getCurrentQuestionPoints():number {
    if (!this.optionSelected) {
      return 0;
    }

    if (this.optionSelected && this.optionSelected.isCorrect) {
      this.totalPoints += this.getQuestionPoints();
      return this.getQuestionPoints();
    }

    return 0;
  }

  private getCurrentQuestionSeconds():string {
    if (!this.optionSelected) {
      return 'not response';
    }

    const seconds = this.getQuestionSeconds() - this.seconds;
    return seconds.toString();
  }

  private getSelectedIndex(): any {
    if (!this.optionSelected) {
      return '';
    }

    return this.selectedIndex;
  }

  private countCorrectAndIncorrect() {
    if(!this.optionSelected || !this.optionSelected.isCorrect) {
      this.inCorrectQuantity ++;
    } else {
      this.correctQuantity ++;
    }
  }

  private saveUserResponses() {
    const userQuizResponses = {
      idQuiz: this.quiz.id,
      name: this.player,
      date: new Date(),
      questionQuantiy: this.quiz.countQuestions,
      correctQuantiy: this.correctQuantity,
      inCorrectQuantity: this.inCorrectQuantity,
      totalPoints: this.totalPoints,
      userResponses: this.userResponses,
    }
  }

}
