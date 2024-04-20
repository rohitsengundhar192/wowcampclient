import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { map, startWith } from 'rxjs';
// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
export interface PeriodicElement {
  col1: number;
  col2: number;
  col3: string;
  col4: string;
}

@Component({
  selector: 'app-review-book-tickets-updated',
  templateUrl: './review-book-tickets-updated.component.html',
  styleUrls: ['./review-book-tickets-updated.component.scss'],
})
export class ReviewBookTicketsUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio: MatRadioButton;
  @Output() categoryId = new EventEmitter();

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  firstFormGroup = this._formBuilder.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    activity1: ['', Validators.required],
    sel1: ['', Validators.required],
  });

  get country() {
    return this.firstFormGroup.get('country');
  }
  get city() {
    return this.firstFormGroup.get('city');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  filteredCountries: any;
  formValues: any;
  city_1: any = ([] = []);
  changecountryid: any;
  location: any;
  locationName: any;
  dataa: any;
  travel_data: any;
  data_json: any;
  user_category_id: any;
  downloadforms: any;
  isLogin = false;
  category: any;
  btndisable = true;
  select_category$: Observable<any>;
  catgoryname: any;
  value1: any;
  s: any;
  category_id: any;
  table_details: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  BookEntryTickets: any;
  country_code: any;
  customer_id: any;
  ticketprice: any;
  user_idd: any;
  camp_city_id: any;
  country_id: any;
  get_wow_amount: any;
  getuser_id: any;
  get_wow_user_id: any;
  get_get_amount: any;
  get_get_user_id: any;
  getcampid: any;
  camp_data: any;
  show_table: boolean;
  user_id_login: any;
  countries: Country[] = [];
  CountryfilteredOptions!: Observable<Country[]>;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private _dataShare: DataSharingService,
    private service: CountryStateCityService,
    private _snackbar: SnackBarService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService,
    private _tokenService: TokenService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit() {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    // console.log(token, 'token');

    this._headerTitle.setTitle('Book Camp Tickets');
    this.show_table = false;

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
  //* ----------------------------  APIs Methods  --------------------------*//

  getval(selectedVal: any, dataa: any) {
    let val = selectedVal.name;
    // console.log(val,'value');

    this.changecountryid = dataa;
    // this.firstFormGroup.controls['country'].setValue(val);
    this._apiService.NearestCampSiteTickets(val).subscribe((data) => {
      this.city_1 = data.data;
    });
  }

  getCountryData(data: any) {
    // console.log(data,'data');

    this.country_id = data.shortName;
    this._apiService
      .NearestCampSiteTickets(this.country_id)
      .subscribe((data) => {
        this.city_1 = data.data;
        if (data.statusCode == 400) {
          this._snackbar.success(data.message);
          this.show_table = false;
        }
      });
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

  getCountryCode(e: any) {
    // console.log(e, 'ee');
  }
  getNearestlocation(data1: any) {
    this.locationName = data1;
    this.camp_data = this.locationName.camp_site_name;
    this.getcampid = this.locationName.camp_id;
    this.show_table = true;
  }
  campid: any;
  showData(val: any) {
    // console.log(val,'vl');
    this.campid = val;

    this._spiner.open();
    this._apiService
      .reviewcancelticketsdisplay(this.country_code, this.customer_id, val)
      .subscribe((res) => {
        console.log(res, 'res');

        if (res.data.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        if (res) {
          this._spiner.close();
        }
        this.dataSource.data = res.data;
      });
  }

  disabled(element: any) {
    this.btndisable = false;
    this._dataShare.radioButtonFunctionovernight(false);
    this._dataShare.disabledData(element);
    this.get_wow_amount = element.wowamountamount;
    this.get_get_amount = element.getamountamount;
    this.getuser_id = element.info.user_id;
  }

  bookcancel(user_id: any) {
    this._apiService
      .reviewcancelticketsdisplayupdate(
        this.country_code,
        this.customer_id,
        this.user_id_login,
        user_id,
        this.getcampid
      )
      .subscribe((res) => {
        this.user_idd = user_id;

        this.showData(this.getcampid);

        if (res.statusCode == 200) {
          // this._snackbar.success(res.message);
          this._dataShare.reloadTableBookwowFunction(1);
          this._dataShare.reloadTableBookvolFunction(2);
          this.btndisable = true;
        } else {
          this._snackbar.success(res.message);
        }
      });
  }
  //* --------------------------  Public methods  --------------------------*//
  checkcountry() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
  }

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: any = ['col1', 'col2', 'col3', 'col4', 'col5'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  table_json_data: any;

  onRowClicked(row: any) {}

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    this._apiService
      .reviewcancelticketsdisplay(
        this.country_code,
        this.customer_id,
        this.campid
      )
      .subscribe((res) => {
        // console.log(res, 'res');

        if (res.data.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        if (res) {
          this._spiner.close();
        }
        this.dataSource.data = res.data;
      });
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
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
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
        .matCellDef,th,td,img{
          height: 50px;
          width: 50px;
          padding-left:10px;

        }
        </style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
          <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />                 <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">USERs WITH VALID ENTRY TICKET</span>
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
  onAddressFormSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.formValues = value;
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
