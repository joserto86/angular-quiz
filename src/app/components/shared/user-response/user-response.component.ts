import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-user-response',
  templateUrl: './user-response.component.html',
  styleUrls: ['./user-response.component.css']
})
export class UserResponseComponent implements OnInit {

  id:string = '';
  loading:boolean = false;

  constructor(private responseQuizService: ResponseQuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getUserResponses();
  }

  getUserResponses() {
    this.responseQuizService.getUserResponse(this.id).subscribe(doc => {
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

}
