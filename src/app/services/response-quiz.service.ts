import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class ResponseQuizService {

  currentQuiz!: Quiz;
  playerName: string = '';

  constructor(private firestore: AngularFirestore) { }

  searchByCode(code: string): Observable<any> {
    return this.firestore.collection('quizz', ref => ref.where('code', '==', code)).get();
  }


}
