import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  questionForm: FormGroup;

  constructor(private quizService: QuizService, private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      seconds: [10, Validators.required],
      points: [1000, Validators.required],
      response1: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required]
      }),
      response2: this.fb.group({
        title: ['', Validators.required],
        isCorrect: [false, Validators.required]
      }),
      response3: this.fb.group({
        title: '',
        isCorrect: false
      }),
      response4: this.fb.group({
        title: '',
        isCorrect: false
      })
    })
   }

  ngOnInit(): void {
  }

  seg() {
    return this.questionForm.get('seconds')?.value
  }

  points() {
    return this.questionForm.get('points')?.value
  }

  sumSegundos (value:number) {

    if (this.seg() <= 5) {
      return;
    }

    this.questionForm.patchValue({
      seconds: this.seg() + value
    })
  }

  isCorrect(index: string) {
    this.setResponsesToFalse(index);
    return this.questionForm.get('response' + index)?.patchValue({
      isCorrect: !this.getResponseStatus('response' + index)
    })
  }

  getResponseStatus(index: string) {
    return this.questionForm.get('response' + index )?.get('isCorrect')?.value;
  }

  private setResponsesToFalse(index: string) {
    const arrayValues = ['response1', 'response2', 'response3', 'response4'];
    for (let i = 0; i < arrayValues.length; i++) {
      if (arrayValues[i] !== index) {
        this.questionForm.get(arrayValues[i])?.patchValue({
          isCorrect: false
        })
      }
    }
  }

  addQuestion() {
    console.log(this.questionForm);
  }

}
