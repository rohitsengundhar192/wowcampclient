import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CephService } from 'src/app/shared/services/ceph/cehp.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { uniqBy } from 'lodash';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
export interface PeriodicElement {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
}
@Component({
  selector: 'app-upload-sined-form-updated',
  templateUrl: './upload-sined-form-updated.component.html',
  styleUrls: ['./upload-sined-form-updated.component.scss'],
})
export class UploadSinedFormUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroups = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  firstFormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
  });

  @ViewChild('radio') radio: MatRadioButton;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorElement', { read: ElementRef })
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  row: PeriodicElement;
  UploadSignedForms: any;
  downloadforms: any;
  isLogin = false;
  category: any;
  select_category$: Observable<any>;
  catgoryname: any;
  value1: any;
  s: any;
  category_id: any;
  tables: any;
  user_category_id: any;
  details: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  country_code: any;
  customer_id: any;
  user_id_login: any;
  test: any;
  btndisable = true;
  dataValues: any;
  user_id_file: string;
  cantegory_name: any;
  get_user_id: any;
  uploadFile: any;
  uploadFileName: any;
  bucketName: any;
  gallery_c_file_id: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    public dialog: MatDialog,
    private _dataShare: DataSharingService,
    private _spiner: CustomSpinnerService,
    private authService: JwtAuthService,
    private _snackBarService: SnackBarService,
    private _cephService: CephService,
    private _snackbar: SnackBarService,
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
    this.bucketName = `${this.country_code}-${this.customer_id}`;
    this._headerTitle.setTitle('Camp Participation Consent and Waiver Form');
    this.selectCategory();
    // values for user catgory
    this._apiService
      .selectCategorynormal(this.country_code, this.customer_id)
      .subscribe((data) => {
        this.s = data.data;
      });
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  selectCategory() {
    // this._spiner.open();
    this._apiService
      .selectCategorynormal(this.country_code, this.customer_id)
      .subscribe((data_1) => {
        // if (data_1) {
        //   this._spiner.close();
        // }
        this.category = data_1;
        this.category_id;
      });
  }
  disbtnupload: boolean = true;
  disbtnupload_1: boolean = false;
  btndisable_view: boolean = true;
  checkdownloadnull: any;
  passRowData:any;
  disabled(element: any) {
    console.log(element);
    this.passRowData  = element;
    this.disbtnupload = false;
    this.disbtnupload_1 = true;
    this.btndisable = false;
    this._dataShare.radioButtonFunctionTwo(false);
    this._dataShare.disabledData(element);
    this.get_user_id = element.user_id;
    this.user_id_file = element.cloud_id_name;

    this.checkdownloadnull = element.upload_datetime;
    if (this.checkdownloadnull != null) {
      this.btndisable_view = false;
    } else {
      this.btndisable_view = true;
    }

    // this.fileFormat = element.file_name.split('.').pop(); // Extract file format from filename

    console.log(this.user_id_file);

    this._dataShare.downloadtestUserId(this.user_id_file);
  }

  uniqueData: PeriodicElement[] = [];
  select(e: any) {
    this.cantegory_name = e.user_category_name;
    this.btndisable = true;
    this.btndisable_view = true;
    this._spiner.open();
    this.tables = [];

    this._apiService
      .data_table_two(
        this.country_code,
        this.customer_id,
        this.user_category_id.user_category_id
      )
      .subscribe((res) => {
        this.dataSource.data = [];
        this._spiner.close();
        if (res.data) {
          this._spiner.close();
        }

        const uniqueData = uniqBy(
          res.data,
          'user_id'
        ) as unknown as PeriodicElement[];
        console.log(uniqueData);

        if (uniqueData.length != 0) {
          this.dataSource.data = uniqueData;
          console.log(uniqueData, 'uni');

          this.test = res.data.user_category_name;
        } else {
          this._snackbar.success('Data Not Found');
        }
      });
  }
  fileFormat: any;
  // getfile() {
  //   this._spiner.open();
  //   this._cephService
  //     .getFile(this.bucketName, this.user_id_file)
  //     .subscribe((res) => {
  //       // console.log(res);
  //       if (res) {
  //         this._spiner.close();
  //         this.tables = [];
  //         this.btndisable = true;
  //       }

  //       const blob = new Blob([res], { type: 'application/octet-stream' });
  //       const downloadUrl = URL.createObjectURL(blob);

  //       const link = document.createElement('a');
  //       link.href = downloadUrl;
  //       link.download = `file.pdf`;

  //       link.click();
  //     });
  // }
  // fileFormat: any;
  pdfContent: string;

  getfile() {
    this._spiner.open();
    this._cephService.getFile(this.bucketName, this.user_id_file).subscribe(
      (res) => {
        if (res) {
          this._spiner.close();
          this.tables = [];
          // this.btndisable = true;

          const blob = new Blob([res], { type: 'application/pdf' });
          this.pdfContent = URL.createObjectURL(blob);

          if (this.pdfContent != undefined) {
            this._dataShare.shareViewPdf(this.pdfContent);
            this._dataShare.shareViewPdfUserid(this.user_id_file);
            this.edit();
          }
        }
      },
      (error) => {
        console.error('Error retrieving PDF:', error);
      }
    );
  }

  edit(): void {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      disableClose: true,
      height: '90%',
      width: '560px',
      minWidth: '250px',
      data:this.passRowData
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.btndisable_view = true;
      this.btndisable = true;
      if (result.data) {
        this.btndisable_view = true;
      }
    });
  }

  //Upload File
  onUploadFileCephStorage() {
    let photoFormData: any = new FormData();
    photoFormData.append('is_uploaded_created_via_customapp', false);
    photoFormData.append('app_id', 26);
    photoFormData.append('app_type', 1);
    photoFormData.append('file_name', 'unsigned_form');
    photoFormData.append('attachments', this.getFileUpload);

    this._spiner.open();
    this._cephService.createFile(photoFormData).subscribe((res) => {
      // console.log(res, 'ress');

      this.gallery_c_file_id = res.data[0].cloud_file_id;
      // console.log(this.gallery_c_file_id, 'cloudid');

      if (res?.statusCode == 200) {
        this._snackBarService.success(res.message);
      }

      let body: any = {
        country_code: this.country_code,
        customer_id: this.customer_id,
        waiver_form_upload_cloud_file_id: this.gallery_c_file_id,
        waiver_form_uploaded_by_user_id: this.user_id_login,
        waiver_form_for_participant_user_id: this.get_user_id,
      };
      this._apiService.updateeditindphotovideo(body).subscribe((res) => {
        if (res.statusCode == 200) {
          this._snackbar.success(res.message);
          this.onNoClick();
          this.tables = [];
          this._spiner.close();
          this.btndisable = true;
          this.btndisable_view = true;
          this.disbtnupload_1 = false;
          this.disbtnupload = true;
          this._apiService
            .data_table_two(
              this.country_code,
              this.customer_id,
              this.user_category_id.user_category_id
            )
            .subscribe((res) => {
              this.dataSource.data = [];
              this._spiner.close();
              if (res.data) {
                this._spiner.close();
              }

              const uniqueData = uniqBy(
                res.data,
                'user_id'
              ) as unknown as PeriodicElement[];

              if (uniqueData.length != 0) {
                this.dataSource.data = uniqueData;

                this.test = res.data.user_category_name;
              } else {
                this._snackbar.success('Data Not Found');
              }
            });
        } else {
          this._snackbar.error(res.message);
        }
      });
    });
  }
  onNoClick(): void {
    this._apiService
      .data_table_two(
        this.country_code,
        this.customer_id,
        this.user_category_id.user_category_id
      )
      .subscribe((data) => {
        if (data) {
          this._spiner.close();
        }
        this.dataSource.data = data.data;
        this.test = data.data.user_category_name;
      });
  }

  isVideoLoaded: any;
  getFileUpload: any;
  duration: any;
  time: any;
  disablefileuploadimage: boolean = true;
  public browseVideo(event: any) {
    const file = event.target.files[0];

    this.isVideoLoaded = true;
    let e = event.target as HTMLInputElement;
    if (e.files && e.files[0]) {
      this.getFileUpload = e.files[0];
      // console.log(this.getFileUpload);
      this.onUploadFileCephStorage();
    }
  }

  //* --------------------------  Public methods  --------------------------*//
  // onFileUpload() {
  //   const attachment = new FormData();
  //   attachment.append('customer_id', this.customer_id);
  //   attachment.append('country_code', this.country_code);
  //   attachment.append('user_id', this.get_user_id);
  //   attachment.append('attachments', this.uploadFile);
  //   attachment.append('ianaString', 'Asia/Kolkata');

  //   this._httpClient
  //     .post(
  //       'http://localhost:3001/api/getWOW.camp/campparticipationapprovaland/add-file-master',
  //       attachment
  //     )
  //     .subscribe((res) => {});
  // }

  upload(e: any) {
    const form = document.getElementById('form');
  }
  //* ------------------------------ Helper Function -----------------------*//

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col1','col2', 'col3', 'col4', 'col5', 'col6'];
  onRowClicked(row: any) {}
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  table_json_data: any;

  loadData() {
    this._apiService
      .get_periodic_elements(this.currentPage, this.pageSize)
      .subscribe((res) => {
        this.table_json_data = res;
        this.dataSource.data = res.data.rows;

        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.data.count;
        });
      });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    // this._apiService
    // .data_table_two(
    //   this.country_code,
    //   this.customer_id,
    //   this.user_category_id.user_category_id
    // )
    // .subscribe((res) => {
    //   this.dataSource.data = [];
    //   this._spiner.close();
    //   if (res.data) {
    //     this._spiner.close();
    //   }

    //   const uniqueData = uniqBy(
    //     res.data,
    //     'user_id'
    //   ) as unknown as PeriodicElement[];
    //   console.log(uniqueData);

    //   if (uniqueData.length != 0) {
    //     this.dataSource.data = uniqueData;
    //     console.log(uniqueData, 'uni');

    //     this.test = res.data.user_category_name;
    //   } else {
    //     this._snackbar.success('Data Not Found');
    //   }
    // });
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
    let category = this.cantegory_name;

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

          <div style=" display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
          <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">CAMP PARTICIPATION APPROVAL AND WAIVER FORMs DATA FOR USERs REGISTERED UNDER USER CATEGORY: </span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">${category} </span>
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

  imageuser_id_vol: any;
  isrowselectedfirstreplyauth(e: any) {
    this.imageuser_id_vol = e.authorizer_id;
  }
  openUserProfileauth() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.imageuser_id_vol,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }
  //! -------------------------------  End  --------------------------------!//
}
