import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryPassComponent } from './recovery-pass/recovery-pass.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorService } from 'src/app/services/error.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryPassComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: [ErrorService]
})
export class UserModule { }
