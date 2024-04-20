import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginRestrictionComponent } from 'src/app/shared/dialogs/login-restriction/login-restriction.component';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';

@Component({
  selector: 'app-book-camp-tickets-updated',
  templateUrl: './book-camp-tickets-updated.component.html',
  styleUrls: ['./book-camp-tickets-updated.component.scss'],
})
export class BookCampTicketsUpdatedComponent implements OnInit {
  isLogin = false;
  constructor(
    public dialog: MatDialog,
    private _headerTitle: HeaderTitleService,
    public data_sharing: DataSharingService,
    private authService: JwtAuthService
  ) {}
  res_book_data: any;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  user_registration_login_approval_status: any;
  hidecontent: boolean = false;
  ngOnInit() {
    this.data_sharing.updateAuditTrailData('book_camp');
    this.data_sharing.update_showTop_data(false);
    // this.data_sharing.update_show_side(true);
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.user_registration_login_approval_status =
      token.user.user_registration_login_approval_status;
    if (this.user_registration_login_approval_status === 3) {
      // console.log('showing html content');
      this.hidecontent = false; // Show the HTML content
    } else {
      // console.log('open dialogue');
      this.hidecontent = true; // Hide the HTML content

      const dialogRef = this.dialog.open(LoginRestrictionComponent, {
        disableClose: true,
        height: 'auto',
        width: '350px',
        minWidth: '350px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.hidecontent = this.user_registration_login_approval_status !== 3;
      });
    }
    // const dialogRef = this.dialog.open(PopupcomponentComponent, {
    //   width: '500px',
    //   height: '500px',
    // });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this.isLogin = result.data.login_status;
    // });
    this._headerTitle.setTitle('Book Camp Tickets');
  }

  ngOnDestroy() {
    if (this.data_sharing.updateAuditTrailData) {
      this.data_sharing.updateAuditTrailData(undefined);
    }
  }
}
