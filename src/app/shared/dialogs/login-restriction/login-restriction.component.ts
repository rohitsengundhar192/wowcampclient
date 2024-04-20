import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-restriction',
  templateUrl: './login-restriction.component.html',
  styleUrls: ['./login-restriction.component.scss']
})
export class LoginRestrictionComponent implements OnInit {

  constructor(public loginDialogRef: MatDialogRef<LoginRestrictionComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.loginDialogRef.close();
  }
}
