import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import {
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popupauthorizer',
  templateUrl: './popupauthorizer.component.html',
  styleUrls: ['./popupauthorizer.component.scss'],
})
export class PopupauthorizerComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    categoryforms: ['', Validators.required],
  });

  get categoryforms() {
    return this.firstFormGroup.get('categoryforms');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  login_status = true;
  user_category_id: any;
  details: any;
  listofUserId: string[] = [];
  form: FormGroup;
  searchContact: any;
  getAllUser: any;
  contact_list: any;
  s: any;
  category: any;
  searchText: string;
  array: any[] = [];
  user_id: any;
  tabless: any;
  get_user_id: any;
  country_code: any;
  customer_id: any;
  volunteerID: any;
  user_category_ids: any;
  user_id_login:any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<PopupauthorizerComponent>,
    public dialog: MatDialog,
    private _snackbar: SnackBarService,
    private api_service: ApiService,
    private _formBuilder: FormBuilder,
    private _dataShare: DataSharingService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService,
    public MatDialogRef: MatDialogRef<PopupauthorizerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    // console.log(token,'token');
    this.selectCategory();
    this.api_service.selectCategory(this.country_code,this.customer_id).subscribe((data) => {
      this.s = data.data;
    });
    this._dataShare.download_test_user_id_data.subscribe((res) => {
      this.get_user_id = res;
    });
  }

  onsubmit() {
    this.loginDialogRef.close({ data: { login_status: this.login_status } });
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  selectCategory() {
    this._spiner.open();
    this.api_service.selectCategory(this.country_code,this.customer_id).subscribe((data_1) => {
      if (data_1) {
        this._spiner.close();
      }
      this.category = data_1;
    });
  }

  select(e: any) {
    this.user_category_ids = e.user_category_id;
    this._spiner.open();
    this.api_service
      .authorizerTodisplay(this.country_code,this.customer_id,this.user_category_ids, this.get_user_id)
      .subscribe((res) => {
        if (res) {
          this._spiner.close();
        }
        this.details = res.data;
        this.contact_list = this.details;
      });
  }

  check_add_user(data: any) {
    this.volunteerID = data.user_id;
  }
  add_authorizer() {
    this._dataShare.data_volenteer.subscribe((val) => {
      this.api_service
        .addAuthorizer(this.country_code,this.customer_id,this.user_id_login,this.get_user_id, this.volunteerID)
        .subscribe((res) => {
          if (res.statusCode == 200) {
            this._snackbar.success(res.message);
          } else {
            this._snackbar.error(res.message);
          }
        });
    });
    this.MatDialogRef.close(this.user_category_ids);
  }
  //* --------------------------  Public methods  --------------------------*//
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  //* ------------------------------ Helper Function -----------------------*//
  getCustomerProfileUrl(ceph_object_id: string) {
    let profileUrl =
      environment.ceph_URL_test +
      this.country_code +
      '-' +
      this.customer_id +
      '/' +
      ceph_object_id;
    return profileUrl;
  }
  imageuser_id: any;
  isrowselectedfirstreply(e: any) {
    // console.log(e.user_id);

    this.imageuser_id = e.user_id;
  }
  openUserProfile() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.imageuser_id,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  //! -------------------------------  End  --------------------------------!//
}
