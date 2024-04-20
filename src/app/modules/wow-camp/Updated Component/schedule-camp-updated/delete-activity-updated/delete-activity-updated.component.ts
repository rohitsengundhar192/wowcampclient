import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { DateTime } from 'luxon';
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
  col1: number;
  col2: number;
  col3: string;
}
interface act {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-delete-activity-updated',
  templateUrl: './delete-activity-updated.component.html',
  styleUrls: ['./delete-activity-updated.component.scss'],
})
export class DeleteActivityUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  countries: Country[] = [];
  CountryfilteredOptions!: Observable<Country[]>;
  @ViewChild('radio') radio: MatRadioButton;

  firstFormGroup = this._formBuilder.group({
    act1: ['', Validators.required],
    par12: ['', Validators.required],
    vol12: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
  });

  get act1() {
    return this.firstFormGroup.get('act1');
  }
  get par12() {
    return this.firstFormGroup.get('par12');
  }
  get vol12() {
    return this.firstFormGroup.get('vol12');
  }
  get country() {
    return this.firstFormGroup.get('country');
  }
  get city() {
    return this.firstFormGroup.get('city');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  DeleteActivityGroups: any;
  filteredCountries: any;
  selectData: any;
  camp_id_req: any;
  camp_name: any;
  count_of_total: number = 0;
  count_of_voluteer: number = 0;
  trip_id: any;
  group_id_get: any;
  trip_name: any;
  getcamp_id: any;
  locationName: any;
  gruop_id: any;
  place: any;
  a: any[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  country_code: any;
  customer_id: any;
  city_1: any;
  country_id: any;
  dataa: any;
  changecountryid: any;
  formValues: any;
  user_id_login: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private service: CountryStateCityService,
    private _snackbar: SnackBarService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService,
    private _tokenService: TokenService
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
  getNearestlocation(data1: any) {
    // console.log(data1, 'd');

    this.locationName = data1;
    this.getcamp_id = this.locationName;
    this.camp_id_req = this.getcamp_id.camp_id;
    // console.log(this.camp_id_req, 'camp');

    this.camp_name = this.getcamp_id?.camp_site_name;

    if (this.locationName != undefined) {
      this.dataSource.data = [];
      this.count_of_total = undefined;
      this.count_of_voluteer = undefined;
      this.disabledelete = true;
      this.trip_id = undefined;
      this.selectData = [];
    }
    this.selectactivity();
  }
  selectactivity() {
    // this._spiner.open();
    // console.log(this.camp_id_req, 'ci  1');

    this._apiService
      .selectactivity(this.country_code, this.customer_id, this.camp_id_req)
      .subscribe((res) => {
        // console.log(res, 'res');
        if (res?.data?.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        if (res?.data?.length != undefined) {
          this.selectData = res.data;
        }
        if (res) {
          this._spiner.close();
        }
      });
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
  disabledelete: boolean = true;
  selectedvalue(e: any) {
    this.count_of_voluteer = 0;
    this.trip_name = e.activity_group_name;
    this.trip_id = e.activity_group_trip_id;
    // console.log(this.trip_id, 'tro');
    if (this.trip_id > 0) {
      this.disabledelete = false;
    }

    this._spiner.open();
    this._apiService
      .deleteactivitygroupdisplay(
        this.country_code,
        this.customer_id,
        this.trip_id,
        this.camp_id_req
      )
      .subscribe((res: any) => {
        // console.log(res, 'r');

        if (res.data?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }
        // console.log(res.data.overall_result.length,'r');
        if (res.data?.overall_result?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }

        if (res) {
          this._spiner.close();
        }
        this.count_of_total = res.data.length;
        res.data.map((value: any) => {
          this.camp_name = value.info.camp_site_name;

          if (value.info.entry_ticket_type == 1) {
            this.count_of_voluteer += 1;
          }
        });
        this.dataSource.data = res.data;
      });
  }
  deleteactivity() {
    this._apiService
      .deleteactivitygroupdupdate(
        this.country_code,
        this.customer_id,
        this.user_id_login,
        this.trip_id,
        this.camp_id_req
      )
      .subscribe((res) => {
        this.dataSource.data = [];

        if (res.statusCode == 200) {
          this._snackbar.success(res.message);
        } else {
          this._snackbar.error(res.message);
        }
      });
  }
  getCountryData(data: any) {
    this.country_id = data.shortName;

    this._apiService
      .nearcampschedule(this.country_id, this.customer_id)
      .subscribe((data) => {
        // this.city_1 = data.data;
        // if (data.statusCode == 400) {
        //   this._snackbar.error(data.message);
        // }
        this.performDependentAction();
      });

    if (this.country_id != undefined) {
      this.dataSource.data = [];
      this.count_of_total = undefined;
      this.count_of_voluteer = undefined;
      this.disabledelete = true;
      this.trip_id = undefined;
      this.selectData = [];
      this.camp_name = undefined;
    }
  }

  getval(selectedVal: any, dataa: any) {
    let val = selectedVal.name;
    this.changecountryid = dataa;
    // this.firstFormGroup.controls['country'].setValue(val);

    this._apiService
      .nearcampschedule(this.country_lower, this.customer_id)
      .subscribe((data) => {
        // console.log(data, 'dat');

        this.performDependentAction();
      });
  }
  country_lower: any;
  performDependentAction() {
    this.city_1 = [];
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
        }
      });
    // Perform other actions using this.country_id
  }
  //* --------------------------  Public methods  --------------------------*//
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col1', 'col2', 'col3'];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }
  onRowClicked(row: any) {}
  table_json_data: any;
  loadData() {
    this._apiService
      .deleteactivitygroupdisplay(
        this.country_code,
        this.customer_id,
        this.trip_id,
        this.camp_id_req
      )
      .subscribe((res: any) => {
        // console.log(res, 'r');

        if (res.data?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }
        // console.log(res.data.overall_result.length,'r');
        if (res.data?.overall_result?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }

        if (res) {
          this._spiner.close();
        }
        this.count_of_total = res.data.length;
        res.data.map((value: any) => {
          this.camp_name = value.info.camp_site_name;

          if (value.info.entry_ticket_type == 1) {
            this.count_of_voluteer += 1;
          }
        });
        this.dataSource.data = res.data;
      });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
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
          .mat-column-select{display:none}
          </style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
          <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />
          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">USERs WITH VALID ENTRY TICKET TO THE WOW CAMP SITE:${
              this.camp_name
            }</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">AND GROUPED UNDER ACTIVITY GROUP NAME: ${
              this.trip_name
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
  //* ------------------------------ Helper Function -----------------------*//
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
  checkcou_city_button() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
    if (this.firstFormGroup.get('city').hasError('required')) {
      this.firstFormGroup.controls['city'].markAsTouched();
    }
    if (this.firstFormGroup.get('act1').hasError('required')) {
      this.firstFormGroup.controls['act1'].markAsTouched();
    }
  }
  onAddressFormSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.formValues = value;
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
  //! -------------------------------  End  --------------------------------!//
}
