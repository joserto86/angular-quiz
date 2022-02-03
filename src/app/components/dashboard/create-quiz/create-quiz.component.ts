import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  quizForm: FormGroup;
  showError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private quizService: QuizService) { 
    this.quizForm = this.fb.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
  }
  
  next() {
    if (this.quizForm.invalid) {
      this.showError = true;

      setTimeout(() => {
        this.showError = false
      }, 3000);
    } else {
      this.quizService.quizTitle = this.quizForm.get('title')?.value;
      this.quizService.quizDesc = this.quizForm.get('desc')?.value;
      this.router.navigate(['dashboard/create-question']);
    }
  }
}
