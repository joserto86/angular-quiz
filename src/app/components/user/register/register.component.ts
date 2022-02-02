import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  
  constructor(private fb: FormBuilder) { 
    this.registerForm = this.fb.group({
      user: ['', [Validators.required, Validators.email ]],
      pass: ['', [Validators.required, Validators.minLength(6) ]],
      repeatPass: [''],
    }, { validator: this.checkPass })
  }

  ngOnInit(): void {
  }

  checkPass(group: FormGroup) :any {
    const pass = group.controls["pass"]?.value;
    const repeatPass =  group.controls["repeatPass"]?.value;

    return pass === repeatPass ? null : {notSame: true}
  }

  register() {

  }

}
