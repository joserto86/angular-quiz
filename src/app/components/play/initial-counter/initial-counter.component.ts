import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-counter',
  templateUrl: './initial-counter.component.html',
  styleUrls: ['./initial-counter.component.css']
})
export class InitialCounterComponent implements OnInit, OnDestroy {

  counter:number = 3;
  setInterval:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.playInitialCounter();
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  playInitialCounter() {
    this.setInterval = setInterval(() => {
      if (this.counter === 0) {
        this.router.navigate(['/play/do-quiz']);
      }
      
      this.counter --;    
    }, 1000)
  }

}
