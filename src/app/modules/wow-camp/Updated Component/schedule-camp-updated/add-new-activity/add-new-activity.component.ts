import { Component, HostListener, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { DateTime } from 'luxon';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { Observable, map, startWith } from 'rxjs';
// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
export interface PeriodicElement {
  col: string;
  col1: number;
  col2: number;
  col3: string;
}

@Component({
  selector: 'app-add-new-activity',
  templateUrl: './add-new-activity.component.html',
  styleUrls: ['./add-new-activity.component.scss'],
})
export class AddNewActivityComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    par11: ['', Validators.required],
    vol11: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  });

  get firstCtrl() {
    return this.firstFormGroup.get('firstCtrl');
  }
  get par11() {
    return this.firstFormGroup.get('par11');
  }
  get vol11() {
    return this.firstFormGroup.get('vol11');
  }
  get country() {
    return this.firstFormGroup.get('country');
  }
  get city() {
    return this.firstFormGroup.get('city');
  }

  countries: Country[] = [];
  CountryfilteredOptions!: Observable<Country[]>;
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  ActivityGroups: any;
  filteredCountries: any;
  formValues: any;
  city_1: any = ([] = []);
  changecountryid: any;
  location: any;
  locationName: any;
  dataa: any;
  travel_data: any;
  numSelected: any = 0;
  data_json: any;
  groupname: any;
  volsel: any;
  parsel: any;
  btnDisabled1: boolean = true;
  submitBtnStatus: boolean = false;
  value: any = 4;
  volvalue: any = 1;
  camp_id_req: any;
  camp_name: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  @ViewChild('radio') radio: MatRadioButton;
  country_code: any;
  customer_id: any;
  btnDisabled: boolean;
  group_name: any;
  participants_selected: any;
  group_name_par: any;
  group_name_vol: any;
  filterValue = '';
  user_id_login: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private service: CountryStateCityService,
    private _dataShare: DataSharingService,
    private _snackbar: SnackBarService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService,
    private _tokenService: TokenService,
    public loginDialogRef: MatDialogRef<AddNewActivityComponent>
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    // console.log(token, 'token');

    this._headerTitle.setTitle('Schedule Camp Trip / Activity Groups');
    this.countries = countrycitystatejson.getCountries();
    this.CountryfilteredOptions = this.firstFormGroup.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this.countryfilter(name as string)
          : this.countries.slice();
      })
    );
    // console.log(this.firstFormGroup.get('firstCtrl').value, 'firstafsssaf');
  }

  // Filter by using Country
  displayCountry(user: any) {
    return user && user.name ? user.name : '';
  }
  private countryfilter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//

  onAddressFormSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.formValues = value;
  }
  country_id: any;
  getcamp_id: any;
  getCountryData(data: any) {
    this.country_id = data.shortName;
    // this._apiService
    //   .nearcampschedule(this.country_lower, this.customer_id)
    //   .subscribe((data) => {
    //     console.log(data,'dat');

    //     // if (data.data?.overall_result?.length == 0) {
    //     //   this._snackbar.success('Data Not Found 999');
    //     //   this._spiner.close();
    //     // }

    //     if (data.data?.overall_result?.length != 0) {
    //       this._spiner.close();
    //       this.city_1 = data.data;

    //     }

    //     this.performDependentAction();
    //   });
  }
  getval(selectedVal: any, dataa: any) {
    let val = selectedVal.name;
    // console.log(val);

    this.changecountryid = dataa;
    // this.firstFormGroup.controls['country'].setValue(val);
    this._apiService
      .nearcampschedule(val, this.customer_id)
      .subscribe((data) => {
        this.performDependentAction();
      });
  }
  country_lower: any;
  performDependentAction() {
    this.city_1 = [];
    // Code that depends on this.country_id can be placed here
    this.country_lower = this.country_id.toLowerCase();
    // console.log(this.country_lower, 'low');
    this._apiService
      .nearcampschedule(this.country_lower, this.customer_id)
      .subscribe((data) => {
        if (data.data?.overall_result?.length == 0) {
          this._snackbar.success('Data Not Found');
        }
        if (data.data?.overall_result?.length != 0) {
          this.city_1 = data.data;
          // console.log(this.city_1, 'city');
        }
        // this.city_1 = data.data;
      });
    // Perform other actions using this.country_id
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

  getNearestlocation(data1: any) {
    this.locationName = data1;
    this.getcamp_id = this.locationName;
    this.camp_id_req = this.getcamp_id.camp_id;
    this.camp_name = this.getcamp_id.camp_site_name;
    this.select(this.camp_id_req);
    // this.firstFormGroup.controls['firstCtrl'].setValue(null);
    this.selection.clear();
  }
  select(val: any) {
    // this._spiner.open();
    this._apiService
      .activitygroupdisplay(this.country_code, this.customer_id, val)
      .subscribe((res) => {
        if (res.data?.overall_result?.length == 0) {
          this._snackbar.success('Data Not Found');
        }
        if (res.data?.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        this.dataSource.data = res.data;
      });
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col', 'col1', 'col2', 'col3'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any;
  totalcolumn: any;
  selectedNum: any;
  divselected: any;
  isAllSelected() {
    this.numSelected = this.selection.selected.length;
    this.selectedNum = this.numSelected;
    this.divselected = this.numSelected / 5;
    this.rowValue = this.selection.selected;
    const numRows: any = this.dataSource.data.length;
    return this.numSelected === numRows;
  }
  firstformValues: any;
  btnafterinsert: boolean = true;
  activitydatalength: any;
  update() {
    this.submitBtnStatus = true;
    this.firstformValues = this.firstFormGroup.value;
    let user_ids: string[] = [];
    let name1: any = {
      activity_Data: this.firstFormGroup.controls['firstCtrl'].value,
    };
    this.activitydatalength = [name1.activity_Data];
    console.log(this.activitydatalength.length, 'names');
    let data1: any;
    this.rowValue.forEach((item: { info: any }) => {
      user_ids.push(item.info.ticket_for_user_id);

      data1 = {
        user_id: item.info.ticket_for_user_id,
      };
    });

    if (this.rowValue.length >= 1 && this.activitydatalength.length != 0) {
      this._apiService
        .activitygroupinsert(
          this.country_code,
          this.customer_id,
          this.user_id_login,
          user_ids,
          this.camp_id_req,
          name1
        )
        .subscribe((ress) => {
          // this.btnDisabled1 = true;
          this.firstFormGroup.controls['firstCtrl'].setValue(' ');
          this.firstFormGroup.get('firstCtrl').reset();
          this.city_1 = [];

          if (ress.statusCode == 201) {
            this.btnafterinsert = true;
            this.dataSource.data = [];
            this.countt_reg = null;
            this.countt_vol = null;
            this.selection.clear();
            this.groupname = [];

            this._snackbar.success('Data Inserted Sucessful');
            this.onNoClick();
          } else {
            this._snackbar.error(ress.message);
          }

          // this._apiService
          //   .activitygroupdisplay(
          //     this.country_code,
          //     this.customer_id,
          //     this.camp_id_req
          //   )
          //   .subscribe((res) => {
          //     this.btnDisabled1 = true;
          //     this.firstFormGroup.controls['firstCtrl'].setValue(' ');
          //     this.city_1=[];
          //     if (ress.statusCode == 201) {
          //       this.btnafterinsert = true;

          //       this._snackbar.success(res.message);
          //     } else {
          //       this._snackbar.error(res.message);
          //     }

          //     this.dataSource.data = res.data;
          //   });
        });
    }
  }
  checkcountry() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
  }
  checkcou_city() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
    if (this.firstFormGroup.get('city').hasError('required')) {
      this.firstFormGroup.controls['city'].markAsTouched();
    }
  }

  checkbox_ensble() {
    if (
      +this.selectedNum >= +this.value &&
      this.countt_vol &&
      this.countt_reg >= this.volvalue
    ) {
      this.btnDisabled1 = false;
    }
  }

  get_vol_count: any;
  regular: any;
  volunteer_tic: any = 0;
  countoftent: any;
  countt_vol: number = 0;
  countt_reg: number = 0;
  countofvolunteer: number = 0;
  countofregular: number = 0;

  disabled(element: any, e: any) {
    this._dataShare.activitycheckboxFunctionticket(false);
    this._dataShare.disabledData(element);
    let get_user_id: number[] = [];

    // console.log(element, 'elee');

    get_user_id = element.info.ticket_for_user_id;
    this.get_vol_count = element.info.entry_ticket_type;

    // console.log(this.get_vol_count,'get');

    if (element.info.entry_ticket_type == '1' && e.checked == true) {
      this.countt_vol++;
    }
    if (element.info.entry_ticket_type == '1' && e.checked == false) {
      this.countt_vol = this.countt_vol - 1;
    }

    if (e.checked == true) {
      this.countt_reg = this.countt_reg + 1;
    }
    if (e.checked == false) {
      this.countt_reg = this.countt_reg - 1;
    }
  }
  passtypeddata: any;
  getDataTypedInInput() {
    if (this.groupname !== undefined) {
      const length = this.groupname?.length;

      this.passtypeddata = this.groupname;

      if (length > 0) {
        this.btnafterinsert = false;
      } else {
        this.btnafterinsert = true;
      }
    }
  }

  
  btn_disable: boolean;
  count_of_vol: any;
  total_data: any;
  ngDoCheck(): void {
    this.getDataTypedInInput();
    // console.log('ng do check works');

    let count_of_volun: number = 0;
    let count_of_regular: number = 0;
    this.selection.selected.map((res: any) => {
      if (res.info.entry_ticket_type == '1') {
        count_of_volun++;
      }
      // if (res.info.entry_ticket_type == '1') {
      //   count_of_regular++;
      // }
      if (res.info.entry_ticket_type == '0') {
        count_of_regular++;
      }
    });

    if (count_of_regular >= 1 && count_of_regular < 11 && count_of_volun == 1) {
      this.btnDisabled1 = false;
    } else if (
      count_of_regular >= 11 &&
      count_of_regular < 21 &&
      count_of_volun == 2
    ) {
      this.btnDisabled1 = false;
    } else if (
      count_of_regular >= 21 &&
      count_of_regular < 31 &&
      count_of_volun == 3
    ) {
      this.btnDisabled1 = false;
    } else if (
      count_of_regular >= 31 &&
      count_of_regular < 41 &&
      count_of_volun == 4
    ) {
    } else if (
      count_of_regular >= 41 &&
      count_of_regular < 51 &&
      count_of_volun == 5
    ) {
      this.btnDisabled1 = false;
    } else if (
      count_of_regular >= 51 &&
      count_of_regular < 61 &&
      count_of_volun == 6
    ) {
      this.btnDisabled1 = false;
    } else {
      this.btnDisabled1 = true;
    }
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  table_json_data: any;
  onRowClicked(row: any) {}
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    // this._apiService
    //   .activitygroupdisplay(
    //     this.country_code,
    //     this.customer_id,
    //     this.camp_id_req
    //   )
    //   .subscribe((res) => {
    //     this.btnDisabled1 = true;
    //     this.firstFormGroup.controls['firstCtrl'].setValue(' ');

    //     // if (ress.statusCode == 201) {
    //     //   this.btnafterinsert = true;
    //     //   this._snackbar.success(res.message);
    //     // } else {
    //     //   this._snackbar.error(res.message);
    //     // }

    //     this.dataSource.data = res.data;
    //   });
  }
  showPageSizeOptions: boolean = true;

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  onPrint() {
    window.print();
  }
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);
    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);
    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);
    // console.log(token1, 'token');

    let app_name: string = token1.user.registered_educational_institution_name;
    let districtStatePincode: string = `${token1.user.city_district_county} ${token1.user.state_province} ${token1.user.pin_code};`;
    let addressline1_adressline2: string = ` ${token1.user.address_line_1} ${token1.user.address_line_2};`;

    let customer_logo = ` ${environment.ceph_URL_test}${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png`;
    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '.mat-table {' +
        '   width: 85%' +
        '}' +
        '.mat-radio-container {' +
        '   display: none' +
        '}' +
        '</style>' +
        `</head>

        <body onload="window.print()">

<style>
input[type=checkbox]{
            display:none
           }
          .mat-column-details,th,td,img{
            height: 50px;
            width: 50px;
            padding-left:10px;
          }
.mat-column-select{display:none}
</style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
\ <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />           <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">USERs WITH VALID ENTRY TICKET TO THE WOW CAMP SITE: ${
              this.camp_name
            }</span>
            <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${
          this.paginator.length
        } ) ${
          this.filterValue.length >= 1
            ? `(Filtered by -" ${this.filterValue} )`
            : ''
        } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
          </div>
          </div>

          ` +
        printContents +
        '</body>' +
        `
          <footer style="position: fixed; bottom: 0; width: 100%;">
          <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${addressline1_adressline2} </span>
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${districtStatePincode}</span>
          </div>
          </footer>
        ` +
        '</html>'
    );
    popupWin.document.close();
  }
  imageuser_id: any;
  isrowselectedfirstreply(e: any) {
    // console.log(e.info.user_id);

    this.imageuser_id = e.info.user_id;
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
  //* ------------------------------ Helper Function -----------------------*//

  //! -------------------------------  End  --------------------------------!//
}
