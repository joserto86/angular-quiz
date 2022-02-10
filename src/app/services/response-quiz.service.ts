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

  setUserResponse(userResponse:any):Promise<any> {
    return this.firestore.collection('responses').add(userResponse);
  }

  getUserResponse(index:string) :Observable<any> {
    return this.firestore.collection('responses').doc(index).get();
  }

  getResponsesByQuizzId(index:string) :Observable<any> {
    return this.firestore.collection('responses', ref => ref.where('idQuiz', '==', index)).snapshotChanges();
  }

  deleteUserResponse(id: string) :Promise<any> {
    return this.firestore.collection('responses').doc(id).delete();
  }

}
