import { ApiService } from 'src/app/shared/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { environment } from 'src/environments/environment';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  //* -----------------------  Variable Declaration  -----------------------*//
  selected: any;
  student_image: any;
  parent_id: any;
  country_code: any;
  customer_id: any;
  login_id: number = 1;
  StudentsDetails: any;
  studentDatas: any;
  ins_weight: any;
  stu_id: any;
  total: any;
  ress: any;
  student_user_id: number;
  stu_details: any;
  stu_val: any;
  set_first_stu: any;
  searchWords: any;
  customer_id_up: any = 33;
  user_id_login_up: any = 3;
  user_id_login: any;
  rowValue: any[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public data_share: DataSharingService,
    private api_service: ApiService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService,
    private snackbar: SnackBarService
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);

    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;

    setTimeout(() => {
      this.data_share.Activity_certificate_top_stu_data.subscribe((resdata) => {
        if (resdata != undefined) {
          setTimeout(() => {
            this.studentDatas = resdata?.student_info;
            this.set_first_stu = resdata?.student_info[0]?.user_id;
            this.data_share.ActivityCertificateValues(this.set_first_stu);
            this.student_user_id = this.studentDatas.Student_user_id;
            this.selected = this.studentDatas[0];
          }, 1000);
        }
      });
    }, 4000);

    this.data_share.Activity_certificate_data.subscribe((res) => {
      if (res) {
        this.stu_val = res;
      }
    });
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  customer_i: any;
  radioButton(elememt: any, event: any) {
    this.customer_i = elememt.customer_image;
    if (event.isUserInput) {
      this.data_share.radioButton(false);
      this.data_share.disabledData(elememt);
      this.stu_id = elememt.user_id;
      this.data_share.ActivityCertificateValues(this.stu_id);

      this.api_service
        .student_data(this.country_code, this.customer_id, this.stu_id)
        .subscribe((res) => {
          this.ress = res.data;
          this.data_share.ActivityCertificateValuesMaterial(this.ress);
        });
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
  getData(val: any) {
    this.StudentsDetails = val;
    this.data_share.ActivityCertificateValues(val);
  }

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  get searchWord() {
    return this.studentDatas.filter((conversation: any) => {
      return (
        conversation.firstName
          .toLowerCase()
          .includes(this.searchWords.toLowerCase()) |
        conversation.LastName.toLowerCase().includes(
          this.searchWords.toLowerCase()
        )
      );
    });
  }

  openedChange(opened: boolean) {
    if (opened === false) {
      this.searchWords = null;
    }
  }
  //! -------------------------------  End  --------------------------------!//
}
