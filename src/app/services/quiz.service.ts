import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizTitle: string = '';
  quizDesc: string = '';

  private question$ = new Subject<Question>();

  constructor(private firestore: AngularFirestore) { }

  addQuestion(question: Question) {
    this.question$.next(question);
  }

  getQuestions():Observable<Question> {
    return this.question$.asObservable();
  }

  createQuiz(quizz: Quiz): Promise<any> {
    this.firestore.collection('quizz').add(quizz);
    return;
  }
}
