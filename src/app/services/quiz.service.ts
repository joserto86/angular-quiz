import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizTitle: string = '';
  quizDesc: string = '';

  constructor() { }
}
