import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  error: boolean = false;
  pin: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ingresar() {
    if (!this.pin) {
      this.error = true;

      setTimeout(() => {
        this.error = false
      }, 3000);
    }
  }
}
