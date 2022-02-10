import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-user-response',
  templateUrl: './user-response.component.html',
  styleUrls: ['./user-response.component.css']
})
export class UserResponseComponent implements OnInit {

  id:string = '';
  loading:boolean = false;

  userQuizResponse:any;
  previousRoute:string = '';

  constructor(private responseQuizService: ResponseQuizService, 
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.previousRoute = this.route.snapshot.url[0].path;
   }

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getUserResponses();
  }

  getUserResponses() {
    this.responseQuizService.getUserResponse(this.id).subscribe(doc => {
      this.loading = false;

      if (!doc.exists) {
        this.backReturn();
        return;
      }

      this.userQuizResponse = doc.data();
      console.log(doc.data());
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

  backReturn() {
    if (this.previousRoute === 'response') {
      this.router.navigate(['/dashboard/statistics', this.userQuizResponse.idQuiz]);
    } else {
      this.router.navigate(['/']);
    }
  }

}
