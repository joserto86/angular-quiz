import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question';
import { Response } from 'src/app/models/response';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  showError: boolean = false;
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
    if (this.questionForm.invalid || this.allIncorrect()) {
      this.error();
      return;
    }

    let responseList: Array<Response> = [];
    const arrayValues = ['response1', 'response2', 'response3', 'response4'];

    for (let i = 0; i < arrayValues.length; i++) {
      let response: Response = {
        description: this.questionForm.get(arrayValues[i])?.get('title')?.value,
        isCorrect: this.questionForm.get(arrayValues[i])?.get('isCorrect')?.value,
      }

      if (response.description != '') {
        responseList.push(response);
      }
    }

    let question: Question = {
      title: this.questionForm.get('title')?.value,
      points: this.questionForm.get('points')?.value,
      seconds: this.questionForm.get('seconds')?.value,
      responses: responseList
    }

    this.quizService.addQuestion(question);
    this.resetForm();
    console.log(this.questionForm);


  }

  resetForm() {
    this.questionForm.reset();

    this.questionForm.patchValue({
      points: 1000,
      seconds: 10,
      response1: {
        title: '',
        isCorrect: false
      }, 
      response2: {
        title: '',
        isCorrect: false
      },
      response3: {
        title: '',
        isCorrect: false
      },
      response4: {
        title: '',
        isCorrect: false
      }
    })
  }

  allIncorrect() {

    const arrayValues = ['response1', 'response2', 'response3', 'response4'];
    for (let i = 0; i < arrayValues.length; i++) {
      if (this.questionForm.get(arrayValues[i])?.get('isCorrect')?.value == true) {
        return false;
      } 
    }

    return true;
  }

  error () {
    this.showError = true;

    setTimeout(() => {
      this.showError = false;
    }, 3000)
  }

}
