import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.css']
})
export class NewPlayerComponent implements OnInit {

  name:string = '';
  errorText: string = '';
  error: boolean = false;
  
  constructor(private responseQuizService: ResponseQuizService,
              private router: Router
    ) { 

  }

  ngOnInit(): void {
    this.validrRefresh();
  }

  insertName() {
    if (!this.name) {
      this.errorMessage('Introduzca su nombre');
      return;
    }

    this.responseQuizService.playerName = this.name;
    this.router.navigate(['/play/init-count']);
  }

  validrRefresh() {
    if (this.responseQuizService.currentQuiz === undefined) {
      this.router.navigate(['/']);
    }
  }

  errorMessage(text:string) {
    this.errorText = text;
    this.error = true;

    setTimeout(() => {
      this.error = false
    }, 4000);
  }
}
