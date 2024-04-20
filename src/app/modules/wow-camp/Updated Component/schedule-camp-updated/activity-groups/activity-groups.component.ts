import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DateTime } from 'luxon';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as XLSX from 'xlsx';

import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { DeleteConfirmDialogComponent } from 'src/app/shared/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { AddNewActivityComponent } from '../add-new-activity/add-new-activity.component';

@Component({
  selector: 'app-activity-groups',
  templateUrl: './activity-groups.component.html',
  styleUrls: ['./activity-groups.component.scss'],
})
export class ActivityGroupsComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  //* -----------------------  Variable Declaration  -----------------------*//
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  country_code: any;
  customer_id: any;
  user_id_login: any;
  formValues: any;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _tokenService: TokenService,
    private authService: JwtAuthService,
    private dialog: MatDialog,
    private apiservice: ApiService,
    private _snackbar: SnackBarService,
    private _apiService: ApiService,
    private _datashare: DataSharingService
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    console.log('activity group');

    this.getTableData();
  }

  ngDoCheck(): void {
    this._datashare.make_null_allfromscheduletoactivity_data.subscribe(
      (res) => {
        if (res == 3) {
          this.activity_group_name = [];
          this.activity_group_trip_id = [];
          this.btndeletedisable = true;
          // this.getTableData();
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.activity_group_name = [];
    this.activity_group_trip_id = [];
    this._datashare.sharedatasourcefromactivitytolistData(undefined);
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  getTableData() {
    this.apiservice
      .getactivitygrouptable(this.country_code, this.customer_id)
      .subscribe((res) => {
        console.log(res, 'res');
        this.dataSource.data = res.data;
      });
  }

  decideDeletepopup() {
    // this.trip_datetime = [];
    console.log(this.trip_datetime, 'tipr');

    if (this.trip_datetime != null) {
      this._snackbar.success('Trip Already Scheduled - Cannot delete the trip');
    } else {
      this.deleteactivity();
    }
  }
  deleteactivity() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      height: '150px',
      minWidth: '350px',
      // data: this.rowvalues,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 1) {
        this._apiService
          .deleteactivitygroupdupdate(
            this.country_code,
            this.customer_id,
            this.user_id_login,
            this.trip_id,
            this.camp_id
          )
          .subscribe((res) => {
            this.dataSource.data = [];

            if (res.statusCode == 200) {
              this._snackbar.success(res.message);
              this.getTableData();
              this._datashare.sharedatasourcefromactivitytolistData(undefined);
              this._datashare.reloadTableActiTableFunction(1);
              this.activity_group_name = [];
              this.activity_group_trip_id = [];
            } else {
              this._snackbar.error(res.message);
            }
          });
      }
      this.btndeletedisable = true;
    });
  }

  //* --------------------------  Public methods  --------------------------*//
  trip_id: any;
  camp_id: any;
  btndeletedisable: boolean = true;
  activity_group_name: any;
  activity_group_trip_id: any;
  trip_datetime: any;
  disabled(e: any) {
    console.log(e, 'ee');
    this._datashare.sharedatasourcefromactivitytolistData(e);
    //for make null on another component activity
    this._datashare.makeNullScheduletoActivity(undefined);

    this.trip_id = e.activity_group_trip_id;
    this.camp_id = e.camp_id;
    this.activity_group_name = e.activity_group_name;
    this.activity_group_trip_id = e.activity_group_trip_id;
    this.trip_datetime = e.trip_datetime;

    this.btndeletedisable = false;

    // e.map((value: any) => {
    //   if (this.trip_datetime != null) {
    //     this.count_of_voluteer += 1;
    //   }
    //   if (value.info.entry_ticket_type == 0) {
    //     this.count_of_total += 1;
    //   }
    // });

    //for make null on another component activity
    this._datashare.makeNullActivitytoSchedule(4);
  }
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: any = ['col1', 'col2'];

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
  openActivityPopup() {
    const dialogRef = this.dialog.open(AddNewActivityComponent, {
      disableClose: true,
      height: '600px',
      width: '560px',
      minWidth: '250px',
      // data: this.rowvalues,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTableData();
      this._datashare.sharedatasourcefromactivitytolistData(undefined);
      this.activity_group_name = [];
      this.activity_group_trip_id = [];
      this._datashare.reloadTableActiTableFunction(1);
    });
  }

  //! -------------------------------  End  --------------------------------!//
}
export interface PeriodicElement {
  col1: number;
  col2: number;
}
