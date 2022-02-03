import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  loading: boolean = false;
  
  constructor(private fb: FormBuilder, 
              private afAuth: AngularFireAuth, 
              private router: Router, 
              private toastr: ToastrService,
              private errorService: ErrorService) { 
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
    const user = this.registerForm.get('user')?.value;
    const pass = this.registerForm.get('pass')?.value;

    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(user, pass).then(action => {
      action.user?.sendEmailVerification();
      this.toastr.success('Enviamos un correo electrónico para verificar su cuenta', 'Usuario registrado!')
      this.router.navigate(['/user']);
    }).catch(error => {
      console.log(error);
      this.registerForm.reset();
      this.loading = false;
      this.toastr.error(this.errorService.error(error.code), 'Opss ocurrió un error');
    })
  }
}
