import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  quizForm: FormGroup;
  showError: boolean = false;

  constructor(private fb: FormBuilder) { 
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
    }
  }
}
