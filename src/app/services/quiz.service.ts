import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizTitle: string = '';
  quizDesc: string = '';

  // quizCollection: AngularFirestoreCollection<Quiz>;
  private question$ = new Subject<Question>();

  constructor(private db: AngularFirestore) {
    // this.quizCollection = this.db.collection('quizz');
  }

  addQuestion(question: Question) {
    this.question$.next(question);
  }

  getQuestions():Observable<Question> {
    return this.question$.asObservable();
  }

  createQuiz(quizz: Quiz): Promise<any> {
    const object:Quiz = {
      uid: quizz.uid,
      title: quizz.title,
      description: quizz.description,
      code: quizz.code,
      countQuestions: quizz.countQuestions,
      createdAt: quizz.createdAt,
      questions: quizz.questions
    }
    
    return this.db.collection('quizz').add(object);
  }

  getQuizzByUserUid(uid:string) {
    return this.db.collection('quizz', ref => ref.where('uid', '==', uid)).snapshotChanges();

    // let quizList = this.quizCollection.ref.where('uid', '==', uid);
    // quizList.firestore.collection.s
  }

  removeQuiz(id:string): Promise<any> {
    return this.db.collection('quizz').doc(id).delete();
  }

  getQuiz(id: string): Observable<any>{
    return this.db.collection('quizz').doc(id).get();
  }
} 
