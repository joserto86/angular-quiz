import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Question} from '../../../models/question'

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  questionList: Question[] = [];

  constructor(private quizService: QuizService) {
    this.quizService.getQuestions().subscribe(data => {
      this.questionList.push(data);
    })
   }

  ngOnInit(): void {

  }

}
