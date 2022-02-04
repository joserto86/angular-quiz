import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit, OnDestroy {

  error: boolean = false;
  pin: string = '';
  errorText: string = '';
  loading:boolean = false;
  subscriptionCode: Subscription = new Subscription();

  constructor(private responseQuiz: ResponseQuizService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscriptionCode.unsubscribe();
  }

  ingresar() {
    console.log('here');
    if (!this.pin) {
      this.errorMessage('Por favor, introduzca un pin');
      return;
    }

    this.loading = true;
    this.subscriptionCode = this.responseQuiz.searchByCode(this.pin).subscribe(data => {
      if (data.empty) {
        this.errorMessage('El pin no es correcto');
        this.loading = false;
      } else {
        data.forEach((element:any) => {
          const quiz: Quiz = {
            id: element.id,
            ...element.data()
          }

          console.log(quiz);

          this.responseQuiz.currentQuiz = quiz;
          this.router.navigate(['/play']);
          
        });

      }
    }, error => {
      console.log(error);
      this.errorMessage(error.message)
      this.loading = false;
    })
  }

  errorMessage(text:string) {
    this.errorText = text;
    this.error = true;
    this.pin = '';

    setTimeout(() => {
      this.error = false
    }, 4000);
  }
}
