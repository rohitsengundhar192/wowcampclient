import { SnackBarService } from './../../../shared/services/snackbar/snackbar.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    sel1: new FormControl('', Validators.required),
    sel2: new FormControl('', Validators.required),
    sel3: new FormControl('', Validators.required),
    sel4: new FormControl('', Validators.required),
  });

  get sel1() {
    return this.firstFormGroup.get('sel1');
  }
  get sel2() {
    return this.firstFormGroup.get('sel2');
  }
  get sel3() {
    return this.firstFormGroup.get('sel3');
  }
  get sel4() {
    return this.firstFormGroup.get('sel4');
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
  array_1: any[] = [];
  user_id: any;
  submit_status = false;
  country_code: any;
  customer_id: any;
  data_Val_data: any;
  user_id_login: any;
  category_id: any;
  contact_addstudents: any;
  category_name: any;
  showSelectAll: boolean = true;
  //* ---------------------------  Constructor  ----------------------------*//

  constructor(
    public loginDialogRef: MatDialogRef<PopupComponent>,
    public dialog: MatDialog,
    private _snackbar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private api_service: ApiService,
    private _dataShare: DataSharingService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//

  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;

    // this.selectCategory();
    console.log(this.data, 'row data');

    this.category_id = this.data?.user_category_id;
    this.category_name = this.data?.user_category_name;
    if (this.category_id != undefined) {
      this.api_service
        .addparticipantsupdate(
          this.country_code,
          this.customer_id,
          this.category_id
        )
        .subscribe((res) => {
          this.contact_addstudents = res.data;
          console.log('meditation');

          if (this.contact_addstudents.length == 0) {
            this._snackbar.success('Data Not Found');
            console.log('meditation not show');

            this.showSelectAll = false;
          } else {
            this.showSelectAll = true;
            console.log('meditation show');
          }
        });
    }

    if (this.country_code != undefined) {
      this.selectCategory();

      this.api_service
        .selectCategoryPopup(
          this.country_code,
          this.customer_id,
          this.category_id
        )
        .subscribe((data) => {
          this.s = data.data;
          // console.log('dsakdsa');
        });
    }

    this._dataShare.datasouce_table_change_data.subscribe((res) => {
      this.data_Val_data = res;
    });
  }

  onNoClick(): void {
    this.loginDialogRef.close();
  }
  category_hod:any;
  //* ----------------------------  APIs Methods  --------------------------*//
  onsubmit() {
    this.loginDialogRef.close({ data: { login_status: this.login_status } });
    this.api_service
      .selectCategoryPopup(
        this.country_code,
        this.customer_id,
        this.category_id
      )
      .subscribe((data_1) => {
        this.category = data_1;
      });
  }
  selectCategory() {
    // this._spiner.open();
    this.api_service
      .selectCategoryPopup(
        this.country_code,
        this.customer_id,
        this.category_id
      )
      .subscribe((data_1) => {
        if (data_1) {
          // this._spiner.close();
        }
        this.category = data_1.data;
        // console.log(this.category, 'data');
      });



      this.api_service
      .selectCategoryPopuphod(
        this.country_code,
        this.customer_id,
        this.category_id
      )
      .subscribe((data_1) => {
        if (data_1) {
          // this._spiner.close();
        }
        this.category_hod = data_1.data;
        // console.log(this.category, 'data');
      });
  }

  select() {
    this._spiner.open();
    this.api_service
      .data_table_not_display(
        this.country_code,
        this.customer_id,
        this.user_category_id.user_category_id
      )
      .subscribe((data) => {
        if (data) {
          this._spiner.close();
        }
        this.details = data.data;
        this.contact_list = this.details;
      });
  }
  disablebtn: boolean = true;
  check_add_user(data: any) {
    this.array_1.push(data);
    // console.log(this.array_1.push(data), 'dat');
    // console.log(data.length, 'dat');

    if (this.submit_status == false) {
      this.submit_status = !this.submit_status;
    }
  }
  add_participants() {
    if (this.submit_status == true) {
      this.submit_status = !this.submit_status;
    }
    for (let i = 0; i < this.array_1.length; i++) {
      const element = this.array_1[i];
      this.api_service
        .addParticipants(
          this.country_code,
          this.customer_id,
          this.user_id_login,
          element.user_id
        )
        .subscribe((res) => {
          if (res.statusCode == 201) {
            this._snackbar.success(res.message);
          } else {
            this._snackbar.error(res.message);
          }
          this.select();
        });
    }
  }

  row: any;
  cantegory_name: any;
  addparticipantsdisable: boolean = true;
  selectvolunteerlist: any;
  selectgetdatavolunteer(e: any) {
    this.addparticipantsdisable = false;
    this.cantegory_name = e.user_category_name;
    this.category_id = e.user_category_id;
    this.api_service
      .addvolunteerupdate(this.country_code, this.customer_id, this.category_id)
      .subscribe((res) => {
        this.selectvolunteerlist = res.data;
      });
  }
  waiver_form_volunteer_user_id: any;
  selectvolun(e: any) {
    this.waiver_form_volunteer_user_id = e.user_id;
  }
  selectedauthorizerlist: any;
  selectgetdataauthorizer(e: any) {
    this.addparticipantsdisable = false;

    this.cantegory_name = e.user_category_name;
    this.category_id = e.user_category_id;

    // this._spiner.open();

    this.api_service
      .addauthorizerupdate(
        this.country_code,
        this.customer_id,
        this.category_id
      )
      .subscribe((res) => {
        // this._spiner.close();
        this.selectedauthorizerlist = res.data;
      });
  }
  waiver_form_authorized_by_user_id: any;
  selectauth(e: any) {
    this.waiver_form_authorized_by_user_id = e.user_id;
  }
  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  addUserToGroup(userId: any) {
    if (this.listofUserId.length == 0) {
      this.listofUserId.push(userId.user_id);
    } else {
      const isExist = this.listofUserId.includes(userId.user_id);
      if (isExist == true) {
        let index = this.listofUserId.indexOf(userId.user_id);
        this.listofUserId.splice(index, 1);
      } else {
        this.listofUserId.push(userId.user_id);
      }
    }
  }
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

  save() {
    let body: any = {
      country_code: this.country_code,
      customer_id: this.customer_id,
      waiver_form_uploaded_by_user_id: this.user_id_login,
      waiver_form_volunteer_user_id: this.waiver_form_volunteer_user_id,
      waiver_form_authorized_by_user_id: this.waiver_form_authorized_by_user_id,
      waiver_form_for_participant_user_id: this.checkeduserid,
    };

    this.api_service.savepartcipants(body).subscribe((res) => {
      if (res.statusCode == 201) {
        this._snackbar.success(res.message);
        this.onNoClick();
      } else {
        this._snackbar.error(res.message);
      }
    });
    this.loginDialogRef.close({ event: true, data: 'true' });
  }

  searchWords: any;
  //mat-select-students
  get searchWord() {
    return this.contact_addstudents.filter((conversation: any) => {
      return (
        conversation.first_name
          .toLowerCase()
          .includes(this.searchWords.toLowerCase()) |
        conversation.last_name
          .toLowerCase()
          .includes(this.searchWords.toLowerCase())
      );
    });
  }
  openedChange(opened: boolean) {
    if (opened === true) {
      this.searchWords = null;
    }
  }
  changedata(checked: any) {
    // let use_ids:any
    this.checkeduserid = this.selection.selected.map((item) => item.user_id);
    // console.log(this.checkeduserid);

    if (this.checkeduserid.length > 0) {
      this.disablebtn = false;
    } else {
      this.disablebtn = true;
    }
  }
  //! -------------------------------  End  --------------------------------!//
  //checkbox
  selection = new SelectionModel<any>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contact_addstudents.length;
    return numSelected === numRows;
  }

  checkeduserid: any;
  selectAllChecked: boolean = false;
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.contact_addstudents.forEach((row: any) =>
        this.selection.select(row)
      );
    }
  }
}
