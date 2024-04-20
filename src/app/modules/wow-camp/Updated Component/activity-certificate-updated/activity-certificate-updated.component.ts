import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { timer as staticTimer } from 'rxjs';
import { MatRadioButton } from '@angular/material/radio';
import { ApiService } from 'src/app/shared/services/api/api.service';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { DateTime } from 'luxon';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/api/token.service';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import * as saveAs from 'file-saver';
import jspdf from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
export interface PeriodicElement {
  col1: string;
  col2: number;
  col3: string;
}
namespace Observable {
  timer: typeof staticTimer;
}

@Component({
  selector: 'app-activity-certificate-updated',
  templateUrl: './activity-certificate-updated.component.html',
  styleUrls: ['./activity-certificate-updated.component.scss'],
})
export class ActivityCertificateUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio: MatRadioButton;
  @ViewChild('content1') content1: ElementRef;
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  firstFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  ActivityCompletionCertificate: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  tables: any;
  pageSizeOptions: number[] = [5, 10, 20];
  getCertificate: any;
  country_no: any;
  customer_id: any;
  login_id: number = 1;
  stu_data: any;
  activity_name: any;
  date: any;
  set_first_stu: any;
  first_stu: any;
  names: any;
  parent_id: any;
  studentDatas: any;
  stu_user_id: any;
  data: any;
  student_val_table: any;
  stu_details: any;
  student_val: any;
  ac_name: any;
  d: any;
  allelement: any = [];
  all: any;
  camp_site: any;
  country_code: any;
  // customer_id_up: any = 9;
  user_id_login_up: any;
  restable: any;
  showdata: boolean = false;
  showdatatopchange: boolean = false;
  inst_name: any;
  inst_add1: any;
  inst_add2: any;
  inst_city: any;
  inst_state: any;
  inst_pin: any;
  inst_customer_logo: any;
  customer_sub_domain_name: any;

  decrypt_token: any;
  cardUrl: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _apiService: ApiService,
    public dialog: MatDialog,
    public data_sharing: DataSharingService,
    public spinner: CustomSpinnerService,
    private _snackbar: SnackBarService,
    private _spinner: CustomSpinnerService,
    private _headerTitle: HeaderTitleService,
    private authService: JwtAuthService,
    private _tokenService: TokenService,
    private router: Router,
    private _iframeService: IframeService
  ) {}
  token_data: any;
  user_user_id: any;
  direct_stu_login_fn: any;
  direct_stu_login_ln: any;
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.token_data = token.user;
    console.log(this.token_data, 'token');

    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login_up = token.user.user_id;
    this.inst_add1 = token.user.address_line_1;
    this.inst_add2 = token.user.address_line_2;
    this.inst_city = token.user.city_district_county;
    this.inst_state = token.user.state_province;
    this.inst_pin = token.user.pin_code;
    this.customer_sub_domain_name = token.user.customer_sub_domain_name;
    // this.data_sharing.update_show_side(true);
    this.inst_name = token.user.registered_educational_institution_name;
    this.inst_customer_logo = `${environment.ceph_URL_test}${token.user.country_code}-${token.user.customer_id}/${token.user.customer_sub_domain_name}-icon-128x128.png`;
    // console.log(this.inst_customer_logo);

    // console.log(token, 'token');
    this.login_id = parseInt(localStorage.getItem('login_id'));
    this._headerTitle.setTitle('WOW Camp - Activity Completion Certificate');
    this._apiService
      .parent_child_select_new(
        this.country_code,
        this.customer_id,
        this.user_id_login_up
      )
      .subscribe((res) => {
        // console.log(res,'reeeeeeeeeeeeeeeeeeeeeee');

        this.loaddatabasedoncategory = res.data.data.catalog;
        this.data_sharing.ActivityCertificateTopStu(res.data.data);
        // this.direct_stu_login_fn = res.data[0].student_info.firstName;
        // this.direct_stu_login_ln = res.data[0].student_info.LastName;

        console.log(this.loaddatabasedoncategory, 'load');

        if (this.loaddatabasedoncategory === 'student') {
          this.data_sharing.update_showTop_data(false);

          this.cardUrl = [];
          if (this.user_id_login_up !== undefined) {
            this._apiService
              .ClassOneToEightUrl(
                this.country_code,
                this.customer_id,
                this.user_id_login_up,
                this.activity_id,
                this.camp_id,
                this.token_data
              )
              .subscribe({
                next: (res: any) => {
                  this.cardUrl = res.data;
                  console.log(this.cardUrl, 'card');
                },
              });
          }
        } else if (this.loaddatabasedoncategory === 'teacher') {
          console.log('Teacher specific code');
          this.data_sharing.update_showTop_data(true);
        } else if (this.loaddatabasedoncategory === 'parent') {
          console.log('parent specific code');
          this.data_sharing.update_showTop_data(true);
        }
      });

    this.cardUrl = [];
    if (this.user_id_login_up !== undefined) {
      this._apiService
        .ClassOneToEightUrl(
          this.country_code,
          this.customer_id,
          this.user_id_login_up,
          this.activity_id,
          this.camp_id,
          this.token_data
        )
        .subscribe({
          next: (res: any) => {
            this.cardUrl = res.data;
            console.log(this.cardUrl, 'card');
          },
        });
    }

    this.data_sharing.activity_completion_selected_student_data.subscribe(
      (res) => {
        if (res) {
          this.student_val = res;
        }
      }
    );

    this.data_sharing.activity_completion_selected_student_data_table.subscribe(
      (res) => {
        if (res) {
          this.student_val_table = res;
          this.activity_name = res.activity_name;
          this.date = res.trip_date_time;
        }
      }
    );

    this.data_sharing.Activity_certificate_data.subscribe((res) => {
      this.stu_data = res;
      // console.log(res, 'r');

      this.first_stu = this.stu_data;
      if (res) {
        this._apiService
          .first_student_data(
            this.country_code,
            this.customer_id,
            this.first_stu
          )
          .subscribe((res) => {
            if (res.statusCode != 200) {
              this._snackbar.success('Data not found');
            } else {
              this.names = res?.data[0];
              // console.log(this.names.customer_image, 'names');

              var fileName = this.names.customer_image;
              var parts = fileName.split('.');
              var numberOnly = parts[0];
              this.user_user_id = parts[0];

              if (this.user_user_id != undefined) {
                this.getUrl();
              }
            }
          });
      }
    });

    let tableData: any[] = [];

    this.data_sharing.Activity_certificate_data_material.subscribe((res) => {
      tableData = [];
      this.booking_date = [];
      this.showdatatopchange = false;
      this.camp_site = undefined;
      // console.log(res, 'logres');

      if (res != undefined) {
        if (res.length > 0) {
          this.restable = res[0].countt;
          this.showdata = true;
          this.dataSource.data = res;
        } else {
          this.dataSource.data = [];
        }
      }
    });

    this._apiService
      .student_data(this.country_code, this.customer_id, this.user_id_login_up)
      .subscribe((res) => {
        this.stu_data = res.data;
        tableData = [];
        this.booking_date = [];

        if (this.stu_data.length > 0) {
          if (res.data) {
            this.showdata = true;
            this.restable = res.data[0].countt;
            this.dataSource.data = res.data;
          }

          this.first_stu = this.stu_data;
          // console.log(this.first_stu[0], 'first');

          if (res) {
            this._apiService
              .first_student_data(
                this.country_code,
                this.customer_id,
                this.user_id_login_up
              )
              .subscribe((res) => {
                if (res.statusCode != 200) {
                  this._snackbar.success('Data not found');
                } else {
                  this.names = res?.data[0];
                  // console.log(this.names, 'names');
                }
              });
          }
        } else {
          this._snackbar.success('Data Not Found');
        }
      });
    // this.generatePDF();

    this.getUrl();
  }
  // this.is_fa_mark
  getUrl() {
    this.cardUrl = [];

    // console.log(this.user_user_id, 'user');

    this._apiService
      .ClassOneToEightUrl(
        this.country_code,
        this.customer_id,
        this.user_id_login_up,
        this.activity_id,
        this.camp_id,
        this.token_data
      )
      .subscribe({
        next: (res: any) => {
          this.cardUrl = res.data;
          // console.log(this.cardUrl, 'card');
        },
      });
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  submit() {
    this.parent_id = this.firstFormGroup.controls['name'].value;
    this.getChildren();
  }

  loaddatabasedoncategory: any;
  getall() {
    this._apiService
      .parent_child_select_new(
        this.country_code,
        this.customer_id,
        this.user_id_login_up
      )
      .subscribe((res) => {
        this.loaddatabasedoncategory = res.data[0].user_category;
        // console.log(this.loaddatabasedoncategory, 'firstS');
      });
  }

  getChildren() {
    this._apiService.parent_child_select().subscribe((datass) => {
      this.studentDatas = datass.data;
      this.stu_user_id = this.studentDatas.Student_user_id;
    });
    this.getData(this.stu_user_id);
  }

  getData(val: any) {
    this.data_sharing.updateActivityCompletionSelectedStudent(val);
  }
  //* --------------------------  Public methods  --------------------------*//

  array: any[] = [];
  booking_date: any;
  camp_id: any;
  activity_id: any;
  content_data: any;
  disabled(element: any) {
    console.log(element);

    this.camp_id = element.camp_id;
    this.activity_id = element.activity_id;

    this._apiService
      .activityCertificatedata(this.activity_id, this.camp_id)
      .subscribe((res) => {
        this.content_data = res.data[0].activity_completion_certificate_details;
      });

    this._apiService
      .ClassOneToEightUrl(
        this.country_code,
        this.customer_id,
        this.user_id_login_up,
        this.activity_id,
        this.camp_id,
        this.token_data
      )
      .subscribe({
        next: (res: any) => {
          this.cardUrl = res.data;
          // console.log(this.cardUrl, 'card');
        },
      });
    this.data_sharing.radioButtonFunction(false);
    this.data_sharing.disabledData(element);
    this.allelement[0] = element;
    this.array = [];
    this.showdatatopchange = true;
    let array = String(this.allelement[0].activity_name).split(',');
    this.booking_date = this.allelement[0].trip_datetime;
    this.array = array;
    // console.log(this.array, 'arru');

    this.camp_site = this.allelement[0].camp_site_name;
    this.ac_name = element.activity_name;
    this.d = element.trip_date_time;
  }
  sharedata: any;
  do() {
    console.log(this.activity_id, this.camp_id, 'activity');

    this._apiService
      .ClassOneToEightUrl(
        this.country_code,
        this.customer_id,
        this.user_id_login_up,
        this.activity_id,
        this.camp_id,
        this.token_data
      )
      .subscribe({
        next: (res: any) => {
          this.sharedata = res.data;
          // console.log(this.cardUrl, 'card');
        },
      });
    if (navigator['share']) {
      navigator['share']({
        title: 'Activity Completion Certificate',
        text: 'Check out ACtivity Certificate — it rocks!',
        url: this.sharedata,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }

  ngDoCheck(): void {
    // console.log(this.cardUrl, 'card');
  }
  //* ------------------------------ Helper Function -----------------------*//
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim();
    this.filterValue = this.filterValue.toLowerCase();
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col1', 'col2', 'col3'];
  onRowClicked(row: any) {}
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  ngAfterViewInit() {
    this.generatePDF();
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
    // this.iframeLoaded();
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

    let tableData: any[] = [];
    this._apiService
      .student_data(this.country_code, this.customer_id, this.user_id_login_up)
      .subscribe((res) => {
        this.stu_data = res.data;
        this.booking_date = [];

        this.dataSource.data = this.stu_data;
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

  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);

    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);
    let app_name: string = token1.user.registered_educational_institution_name;
    let districtStatePincode: string = `${token1.user.city_district_county} ${token1.user.state_province} ${token1.user.pin_code};`;
    let addressline1_adressline2: string = ` ${token1.user.address_line_1} ${token1.user.address_line_2};`;

    // let customer_logo = ` ${environment.ceph_URL}/${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png;`;
    let customer_logo = ` ${environment.ceph_URL_test}${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png`;
    // console.log(customer_logo, 'cust');

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
          <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />
          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Activity Completion Certificate </span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase"> </span>
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

  //certificate

  // pdfDownload() {
  //   this.spinner.open();

  //   // Preload the image
  //   const img = new Image();
  //   img.src =
  //     'https://cephapi.getwow.biz/api/storage/' +
  //     this.country_code +
  //     '-' +
  //     this.customer_id +
  //     '/' +
  //     this.customer_sub_domain_name +
  //     '-icon-128x128.png';

  //   // Wait for the image to load
  //   img.onload = () => {
  //     // Once the image is loaded, proceed with pdf generation
  //     const DATA = this.content.nativeElement;
  //     const doc = new jsPDF('p', 'pt', 'a5');

  //     // Define the position and dimensions of the image
  //     const imgX = 20; // Adjust X position as needed
  //     const imgY = 20; // Adjust Y position as needed
  //     const imgWidth = 60; // Adjust image width as needed
  //     const imgHeight = 60; // Adjust image height as needed

  //     // Add the image to PDF
  //     doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);

  //     // Add the rest of the content
  //     doc.html(DATA, {
  //       callback: (doc) => {
  //         doc.save(
  //           `${this.country_code}_${this.customer_id}_${this.user_user_id}_tutorial.pdf`
  //         );
  //         this.spinner.close();
  //       },
  //     });
  //   };
  // }
  pdfDownload() {
    this.spinner.open();

    // Preload the image
    const img = new Image();
    img.src =
      'https://cephapi.getster.tech/api/storage/' +
      this.country_code +
      '-' +
      this.customer_id +
      '/' +
      this.customer_sub_domain_name +
      '-icon-128x128.png';

    // Wait for the image to load
    img.onload = () => {
      // Once the image is loaded, proceed with pdf generation
      const DATA = this.content1.nativeElement;

      // Increase PDF width
      const pdfWidth = DATA.offsetWidth + 10; // Adjust the value as needed

      const doc = new jsPDF({
        orientation: 'portrait', // or 'landscape'
        unit: 'pt',
        format: [pdfWidth, 595], // Adjust the height (595 is A4 height)
      });

      // Define the position and dimensions of the image
      const imgX = 20; // Adjust X position as needed
      const imgY = 20; // Adjust Y position as needed
      const imgWidth = 60; // Adjust image width as needed
      const imgHeight = 60; // Adjust image height as needed

      // Add the image to PDF
      doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);

      // Add the rest of the content
      doc.html(DATA, {
        callback: (doc) => {
          doc.save(`${this.country_code}_${this.customer_id}_user.pdf`);
          this.spinner.close();
        },
      });
    };
  }
  pdfDataUrl: any;

  async preloadImages() {
    // const imageUrls = [
    //   'https://external-url-1.com/image1.png',
    //   'https://cephapi.getster.tech/api/storage/' +${this.country_code} +'-' +${this.customer_id} +'/' + ${this.customer_sub_domain_name} +'-icon-128x128.png'
    //   'https://external-url-2.com/image2.png',
    //   // Add all image URLs you need to preload
    // ];

    // Construct the image URL
    const imageUrl = [
      `https://cephapi.getwow.biz/api/storage/{this.country_code}-${this.customer_id}/${this.customer_sub_domain_name}-icon-128x128.png`,
    ];
    // console.log(imageUrl,'image');

    const imagePromises = imageUrl.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    await Promise.all(imagePromises);
  }

  async generatePDF() {
    try {
      await this.preloadImages(); // Wait for images to load from external URLs

      // The rest of your code to generate the PDF
      const DATA = this.content1.nativeElement;
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3,
      };

      html2canvas(DATA, options)
        .then((canvas) => {
          // ... (the rest of your code)
          const img = canvas.toDataURL('image/PNG');
          const bufferX = 0;
          const bufferY = 0;
          const imgProps = (doc as any).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(
            img,
            'PNG',
            bufferX,
            bufferY,
            pdfWidth,
            pdfHeight,
            undefined,
            'FAST'
          );
          return doc;
        })
        .then((docResult) => {
          const pdfBlob = docResult.output('blob');
          const pdfDataUrl = URL.createObjectURL(pdfBlob);
          this.pdfDataUrl = pdfDataUrl;
          // console.log(pdfDataUrl, 'pdf');
        });
    } catch (error) {
      console.error('Image loading error:', error);
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
