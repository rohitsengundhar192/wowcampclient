import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  country_no: any = 'in';
  customer_id: any = '1';
  login_status = true;
  constructor(public loginDialogRef: MatDialogRef<LoginComponent>,private _formBuilder: FormBuilder,) {}

  firstFormGroup = this._formBuilder.group({
    pop: ['', Validators.required],
  });

  get country1() {
    return this.firstFormGroup.get('pop');
  }
  ngOnInit() {
    localStorage.setItem('country_no', this.country_no);
    localStorage.setItem('customer_id', this.customer_id);
  }

  onsubmit() {
    this.loginDialogRef.close({ data: {login_status:this.login_status} });
  }
}
