import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResponseComponent } from './user-response/user-response.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    UserResponseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
