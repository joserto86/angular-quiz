import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ResponseQuizService } from 'src/app/services/response-quiz.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  id:string;
  loading:boolean = false;
  userResponses: any[] = [];
  responseQuiz:Subscription = new Subscription();
  
  constructor(private responseQuizService: ResponseQuizService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getResponseByQuizId();
  }

  ngOnDestroy(): void {
    this.responseQuiz.unsubscribe();
  }

  getResponseByQuizId() {
    this.loading = true;

    this.responseQuiz = this.responseQuizService.getResponsesByQuizzId(this.id).subscribe(data => {
      this.loading = false;

      this.userResponses = [];

      data.forEach((element:any) => {
        this.userResponses.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });

      console.log(this.userResponses);

    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  removeUserResponse(id:string) {
    this.loading = true;

    this.responseQuizService.deleteUserResponse(id).then(() => {
      this.toastr.info('La respuesta fue eliminada', 'Respuesta eliminada')
    }, error => {
      console.log(error);
      this.toastr.error('Opps.. ocurrió un error', 'Error');
    }).finally(() => {
      this.loading = false;
    })
  }

}
