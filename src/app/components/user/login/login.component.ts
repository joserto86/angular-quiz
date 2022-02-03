import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading: boolean = false;

  constructor(private fb: FormBuilder, 
              private afAuth: AngularFireAuth, 
              private toastr: ToastrService, 
              private errorService: ErrorService,
              private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const user = this.loginForm.get('user')?.value;
    const pass = this.loginForm.get('pass')?.value;

    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(user, pass).then((response) => {
      console.log(response);
      this.loading = false;

      if (response.user?.emailVerified == false) {
        this.router.navigate(['/user/verify-email']);
      } else {
        
      }

    }, error => {
      this.loading = false;
      this.toastr.error(this.errorService.error(error.code), 'Error');
      this.loginForm.reset();
    });
  }
}
