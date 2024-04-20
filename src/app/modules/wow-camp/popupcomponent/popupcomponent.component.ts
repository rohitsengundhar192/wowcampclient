import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popupcomponent',
  templateUrl: './popupcomponent.component.html',
  styleUrls: ['./popupcomponent.component.scss'],
})
export class PopupcomponentComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    pop: ['', Validators.required],
  });
  get country1() {
    return this.firstFormGroup.get('pop');
  }

  //* -----------------------  Variable Declaration  -----------------------*//
  country_no: any = 'in';
  customer_id: any = '1';
  login_status = true;
  hide = true;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<PopupcomponentComponent>,
    private _formBuilder: FormBuilder
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit() {
    localStorage.setItem('country_no', this.country_no);
    localStorage.setItem('customer_id', this.customer_id);
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//
  onsubmit() {
    this.loginDialogRef.close({ data: { login_status: this.login_status } });
  }
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
