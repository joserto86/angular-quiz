import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit, OnDestroy {

  subscriptionUser:Subscription = new Subscription();
  subcriptionQuiz:Subscription = new Subscription();
  quizList: Quiz[] = [];
  loading: boolean = false;

  constructor(private afAuth: AngularFireAuth, 
              private router: Router, 
              private quizService: QuizService,
              private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptionUser = this.afAuth.user.subscribe(user => {
      if (user && user.emailVerified) {
        this.getQuizs(user.uid);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
    this.subcriptionQuiz.unsubscribe();
  }

  getQuizs(uid: string) {
    this.subcriptionQuiz = this.quizService.getQuizzByUserUid(uid).subscribe(data => {
      this.quizList = [];

      data.forEach((element:any) => {
        this.quizList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.loading = false;
    }, error => {
      this.toastr.success('Opps. Se ha producido un error', 'Error');
      this.loading = false;
    }) 
  }

  removeQuiz(id: string) {
    this.loading = true;
    this.quizService.removeQuiz(id).then(data => {
      this.toastr.success('El cuestionario se ha eliminado correctamente', 'Cuestionario eliminado');
      this.loading = false;
    }).catch(error => {
      this.toastr.success('Opps. Se ha producido un error', 'Error');
      this.loading = false;
    })
  }

}
