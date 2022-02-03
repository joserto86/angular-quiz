import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.css']
})
export class RecoveryPassComponent implements OnInit {

  recoveryForm: FormGroup
  loading: boolean = false;

  constructor(private fb: FormBuilder, 
              private afAuth: AngularFireAuth, 
              private toastr: ToastrService, 
              private errorService: ErrorService,
              private router: Router
  ) {
    this.recoveryForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recoveryPass() {
    const mail = this.recoveryForm.get('user')?.value;

    this.loading = true;

    this.afAuth.sendPasswordResetEmail(mail).then(() => {
      this.toastr.info('Enviamos un correo electrónico para restablecer su password', 'Restablecer password');
      this.router.navigate(['/user']);
    }).catch(error => {
      this.toastr.error(this.errorService.error(error.code), 'Opss ocurrió un error');
      this.recoveryForm.reset();
      this.loading = false;
    })
  }

}
