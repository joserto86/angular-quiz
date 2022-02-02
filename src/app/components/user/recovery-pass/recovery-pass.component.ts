import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.css']
})
export class RecoveryPassComponent implements OnInit {

  recoveryForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.recoveryForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recoveryPass() {
    
  }

}
