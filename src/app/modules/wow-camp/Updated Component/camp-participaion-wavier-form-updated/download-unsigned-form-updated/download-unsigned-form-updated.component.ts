import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { DateTime } from 'luxon';
import { PopupauthorizerComponent } from '../../../popup/popupauthorizer/popupauthorizer.component';
import { PopupvolunteerComponent } from '../../../popup/popupvolunteer/popupvolunteer.component';
import { PopupComponent } from '../../../popup/popup.component';
import { DatePipe } from '@angular/common';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { environment } from 'src/environments/environment';
import { uniqBy } from 'lodash';
import { DeleteConfirmDialogComponent } from 'src/app/shared/dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as saveAs from 'file-saver';
import { CKEditorComponent } from 'ng2-ckeditor';
import { TestingComponent } from '../../testing/testing.component';

export interface PeriodicElement {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}
@Component({
  selector: 'app-download-unsigned-form-updated',
  templateUrl: './download-unsigned-form-updated.component.html',
  styleUrls: ['./download-unsigned-form-updated.component.scss'],
})
export class DownloadUnsignedFormUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  firstFormGroup = new FormGroup({
    sel1: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    selectt: new FormControl('', Validators.required),
  });

  get sel1() {
    return this.firstFormGroup.get('sel');
  }
  get category() {
    return this.firstFormGroup.get('category');
  }
  get selectt() {
    return this.firstFormGroup.get('selectt');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  tables: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  login_id: number;
  name = 'Angular ';
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  alldet_inst: any;
  btndisable = true;
  btndisable1 = true;
  get_user_id: any;
  data: any;
  inst: any;
  selectCategorylist: any;
  cantegory_name: any;
  category_id: any;
  ddd: any;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  restable: any;
  @ViewChild('myckeditor') myckeditor!: CKEditorComponent;
  ckeConfig!: any;
  customer_sub_domain_name: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    public dialog: MatDialog,
    private _dataShare: DataSharingService,
    private _spiner: CustomSpinnerService,
    public _tokenService: TokenService,
    private authService: JwtAuthService,
    private _snackbar: SnackBarService,
    private _resolver: ComponentFactoryResolver,
    private _cd: ChangeDetectorRef
  ) {}

  institutionname: any;
  institutionaddress1: any;
  institutionaddress2: any;
  city_district_county: any;
  state_province: any;
  customer_logo: any;
  customer_logo_data: any;
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.customer_sub_domain_name = token.user.customer_sub_domain_name;
    // console.log(token, 'token download');

    this.customer_logo_data = `${environment.ceph_URL_test}${token.user.country_code}-${token.user.customer_id}/${token.user.customer_sub_domain_name}-icon-128x128.png`;
    console.log(this.customer_logo_data, 'cust');

    this.institutionname = token.user.registered_educational_institution_name;
    this.institutionaddress1 = token.user.address_line_1;
    this.institutionaddress2 = token.user.address_line_2;
    this.city_district_county = token.user.city_district_county;
    this.state_province = token.user.state_province;
    this.customer_logo = ` ${environment.ceph_URL_test}/${token.user.country_code}-${token.user.customer_id}/${token.user.customer_sub_domain_name}-icon-128x128.png;`;

    this._dataShare.update_showTop_data(false);
    this.selectCategory();

    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'exportpdf',

      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        {
          name: 'paragraph',
        },
      ],
      removeButtons:
        'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Outdent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Unlink,Anchor,Flash,orizontalRule,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About',
    };
  }

  @ViewChild('reportContent') reportContent: ElementRef;
  sections: any;

  @ViewChild('content') content: ElementRef;
  pdfDownload() {
    const DATA = this.content.nativeElement;

    const pdfWidth = DATA.offsetWidth + 10;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [pdfWidth, 595],
    });

    // Add the rest of the content
    doc.html(DATA, {
      callback: (doc) => {
        doc.save(
          `${this.country_code}_${this.customer_id}_${this.pdf_first_name}_${this.pdf_last_name}_user.pdf`
        );
      },
    });

    if (doc.AcroForm != undefined) {
      let current_date_time = 'Asia/Kolkata';
      this._apiService
        .downloadDateTime(
          this.country_code,
          this.customer_id,
          this.get_user_id,
          current_date_time,
          this.user_id_login
        )
        .subscribe((res) => {
          if (res) {
            this._spiner.close();
          }
          this._apiService
            .datadisplay(this.country_code, this.customer_id, this.category_id)
            .subscribe((res) => {
              this.tables = [];
              this._spiner.close();
              this.btndisable = true;
              this.btndisable1 = true;
              this.dataSource.data = res.data;
              this._dataShare.datasouceTableChangeFunction(res.data);
            });
        });

      this._spiner.close();
    }
  }
  @ViewChild('testing', { read: ViewContainerRef, static: false })
  entry: ViewContainerRef;
  private _pdf: any;

  createComponent() {
    this.entry.clear();
    const factory = this._resolver.resolveComponentFactory(TestingComponent);
    return this.entry.createComponent(factory);
  }

  htmlToPdf() {
    const doc = new jsPDF();
    const template = this.createComponent();
    this._cd.detectChanges();
    doc.html(template.instance.scandata.nativeElement.innerHTML, {
      callback: () => {
        doc.save('demo.pdf');
        template.destroy();
      },
    });
  }
  //* ----------------------------  APIs Methods  --------------------------*//
  selectCategory() {
    this._spiner.open();
    this._apiService
      .selectCategorynormal(this.country_code, this.customer_id)
      .subscribe((res) => {
        this.restable = res;

        if (res.statusCode == 400) {
          this._snackbar.error(res.message);
        }
        if (res) {
          this._spiner.close();
        }
        this.selectCategorylist = res.data;
      });
  }

  uniqueData: PeriodicElement[] = [];
  row: any;
  addparticipantsdisable: boolean = true;
  selectgetdata(e: any) {
    // console.log(e, 'e');
    this.uniqueData = [];
    this.addparticipantsdisable = false;

    this.cantegory_name = e.user_category_name;
    this.category_id = e.user_category_id;

    this.rowvalues = e;

    if (this.rowvalues != undefined) {
    }
    this.btndisable1 = true;
    this.btndisable = true;
    this._spiner.open();

    this._apiService
      .datadisplay(this.country_code, this.customer_id, this.category_id)
      .subscribe((res) => {
        if (res.data == undefined) {
          // this._snackbar.success('Data Not Found');
          this.dataSource.data = [];
          this._spiner.close();
        }

        if (res.data.length != 0) {
          this._spiner.close();
          this.dataSource.data = res.data;
          this._dataShare.datasouceTableChangeFunction(res.data);
        } else {
          // this._snackbar.success('Data Not Found');
          this.dataSource.data = [];
          this._spiner.close();
        }

        // if (res) {
        //   this._snackbar.success('Data Not Found');
        //   this.dataSource.data = [];
        //   this._spiner.close();
        // }
      });
  }
  rowvalueshare: any;
  waiver_form_for_participant_user_id: any;
  pdf_first_name: any;
  pdf_last_name: any;
  pdf_user_category: any;

  pdf_vol_fname: any;
  pdf_vol_lname: any;
  pdf_vol_caterogy: any;

  pdf_auth_fname: any;
  pdf_auth_lname: any;
  pdf_auth_caterogy: any;
  pdf_user_age: any;
  content_data_article_1: any;
  radio_click(element: any) {
    console.log(element, 'ele');

    this.btndisable = false;
    this.rowvalueshare = element;
    // console.log(this.rowvalueshare, 'row');
    this._dataShare.shareDatatoPdf(this.rowvalueshare);

    this.pdf_first_name = this.rowvalueshare.first_name;
    this.pdf_last_name = this.rowvalueshare.last_name;
    this.pdf_user_category = this.rowvalueshare.category;
    this.pdf_vol_fname = this.rowvalueshare.voluteer_info.first_name;
    this.pdf_vol_lname = this.rowvalueshare.voluteer_info.last_name;
    this.pdf_vol_caterogy = this.rowvalueshare.voluteer_info.category_vol;

    this.pdf_auth_fname = this.rowvalueshare.auth.first_name;
    this.pdf_auth_lname = this.rowvalueshare.auth.last_name;
    this.pdf_auth_caterogy = this.rowvalueshare.auth.category_aut;

    this.pdf_user_age = this.rowvalueshare.age;
    this.addparticipantsdisable = true;

    this.waiver_form_for_participant_user_id = element.user_id;
    this._dataShare.radioButtonFunction(false);
    this._dataShare.disabledData(element);
    if (element.volunteer_id != null && element.authorizer_id != null)
      this.btndisable1 = false;
    else this.btndisable1 = true;
    this.get_user_id = element.user_id;
    this._dataShare.downloadtestUserId(this.get_user_id);
    this.data;
    this.inst;
    this._spiner.open();
    this._apiService
      .ins_data(this.country_code, this.customer_id)
      .subscribe((res) => {
        if (res.data?.overall_result?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }
        if (res) {
          this._spiner.close();
        }
        this.inst = res.data[0];
        console.log(this.inst, 'inst');
        this.content_data_article_1 = this.inst.travel_info;
      });
  }

  changeFormat(_today: any) {
    let ChangedFormat = this.pipe.transform(this.today, 'yy-M-d hh:mm:ss ');
    this.changedDate = ChangedFormat;

    this.pdfDownload();
  }
  //* --------------------------  Public methods  --------------------------*//
  //To open popup
  openedit() {
    if (this.rowvalues != undefined) {
      const dialogRef = this.dialog.open(PopupComponent, {
        width: '400px',
        height: '600px',
        // data: this.selectCategory(),
        data: this.rowvalues,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.tables = [];
        this.btndisable = true;

        this._apiService
          .datadisplay(this.country_code, this.customer_id, this.category_id)
          .subscribe((res) => {
            if (res.data == undefined) {
              this.dataSource.data = [];
              this._spiner.close();
            }

            if (res.data.length != 0) {
              this._spiner.close();
              this.dataSource.data = res.data;
              this._dataShare.datasouceTableChangeFunction(res.data);
            } else {
              this.dataSource.data = [];
              this._spiner.close();
            }
          });
      });
    } else {
      this._snackbar.success('row value not get');
    }
  }
  rowvalues: any;
  // isLogin = false;
  openeditvol(): void {
    const dialogRef = this.dialog.open(PopupvolunteerComponent, {
      disableClose: true,
      width: '400px',
      height: '400px',
      data: this.rowvalueshare,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.tables = [];
      this.btndisable = true;
      this.btndisable1 = true;
      this._apiService
        .datadisplay(this.country_code, this.customer_id, this.category_id)
        .subscribe((res) => {
          // ...
          this._spiner.close();

          this.dataSource.data = res.data;
          this._dataShare.datasouceTableChangeFunction(res.data);
        });
    });
  }

  //delete comformation dialogue
  delete() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      height: '150px',
      minWidth: '350px',
      data: this.rowvalues,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res == 1) {
        this._apiService
          .deleteuserid(
            this.country_code,
            this.customer_id,
            this.waiver_form_for_participant_user_id,
            this.user_id_login
          )
          .subscribe((res) => {
            this._apiService
              .datadisplay(
                this.country_code,
                this.customer_id,
                this.category_id
              )
              .subscribe((res) => {
                // console.log(res, 'rr');
                this.btndisable = true;
                this.btndisable1 = true;
                this.dataSource.data = res.data;
                this._dataShare.datasouceTableChangeFunction(res.data);
              });
          });
      }
    });
  }
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4', 'col5'];
  onRowClicked(row: any) {}
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  table_json_data: any;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // this.loadData();
    this._apiService
      .datadisplay(this.country_code, this.customer_id, this.category_id)
      .subscribe((res) => {
        if (res.data == undefined) {
          this._snackbar.success('Data Not Found');
          this.dataSource.data = [];
          this._spiner.close();
        }

        if (res.data.length != 0) {
          this._spiner.close();
          this.dataSource.data = res.data;
          this._dataShare.datasouceTableChangeFunction(res.data);
        } else {
          this._snackbar.success('Data Not Found');
          this.dataSource.data = [];
          this._spiner.close();
        }
      });
  }
  loadData() {
    // this._apiService
    //   .get_periodic_elements(this.currentPage, this.pageSize)
    //   .subscribe((res) => {
    //     this.table_json_data = res;
    //     this.dataSource.data = res.data.rows;
    //     setTimeout(() => {
    //       this.paginator.pageIndex = this.currentPage;
    //       this.paginator.length = res.data.count;
    //     });
    //   });
  }
  showPageSizeOptions: boolean = true;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

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

  @ViewChild('pdfTable1', { static: false }) pdfTable1!: ElementRef;
  public downloadAsPDF11() {
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
    var printContents = document.getElementById('pdfTable1')!.innerHTML;
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
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">VOLUNTEERs AND AUTHORIZERs DATA FOR USERs REGISTERED UNDER USER CATEGORY: </span>
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

  editor = this._formBuilder.group({
    campparticipation: ['', Validators.required],
  });
  // ckeditorContent: string = `<p> ${this.content_data_article} </p>`;
  @ViewChild('content_data') content_data: ElementRef;

  public wavierformpdf() {
    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);
    let customer_logo = `${environment.ceph_URL_test}${token1.user.country_code}-${token1.user.customer_id}/${token1.user.customer_sub_domain_name}-icon-128x128.png`;

    var printContents = document.getElementById('pdf')!.innerHTML;
    var printContents1 = document.getElementById('pdf2')!.innerHTML;

    let popupWin: any = window.open(
      'Angular Large Table to pdf and pdf2',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page No" counter(page)' +
        '}' +
        '.cke_top  {' +
        'display: none;' +
        '}' +
        '.cke_bottom  {' +
        'display: none;' +
        '}' +
        '.cke_voice_label  {' +
        'display: none;' +
        '}' +
        '</style>' +
        '</head>' +
        '<body>' +
        printContents +
        `<img style="width:100px;height:100px;margin-top:-270px;margin-left:5px" src="${customer_logo}" alt="app-logo" />` +
        printContents1 +
        '</body>' +
        '<footer style="position: fixed; bottom: 0; width: 100%;">' +
        '<div style="display: flex; flex-direction: column; width:100%;">' +
        '<span style="text-align-last: right; margin-right:30px; margin-bottom:-10px; font-size:12px;text-size:12px;font-weight:500">Page no:</span>' +
        '</div>' +
        '</footer>' +
        '</html>'
    );
    popupWin.document.close();

    // Add an event listener for beforeprint and afterprint events
    popupWin.onbeforeprint = function () {
      // console.log('Before Print');
    };

    popupWin.onafterprint = function () {
      // console.log('After Print');
      const printResult = confirm('Did the print operation succeed?');
      if (printResult) {
        // Print successful, pass 1
        // console.log('Print successful (pass 1)');
      } else {
        // Print canceled, pass 0
        // console.log('Print canceled (pass 0)');
      }
      popupWin.close();
    };

    // Initiate the print
    popupWin.print();
  }

  @ViewChild('pdfContent', { static: false }) pdfContent: ElementRef;

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
  imagescr: any;
  // getCustomerlogo(e: any) {
  //   let one: any = localStorage.getItem('access_token');
  //   let token_11: any = this.authService.decodeJwtToken(one);
  //   let profileUrl_1 = ` ${environment.ceph_URL}${token_11.user.country_code}-${token_11.user.customer_id}/${token_11.user.customer_sub_domain_name}-icon-128x128.png`;
  //   console.log(profileUrl_1, 'prili');
  //   this.imagescr = profileUrl_1;

  //   return profileUrl_1;
  // }

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
  isrowselectedvolreply(e: any) {
    this.imageuser_id_vol = e.volunteer_id;
  }
  openUserProfilevol() {
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

  imageuser_id_auth: any;
  isrowselectedauthreply(e: any) {
    this.imageuser_id_auth = e.authorizer_id;
  }
  openUserProfileauth() {
    let config: MatDialogConfig = {
      disableClose: true,
      minWidth: 'auto',
      minHeight: 'auto',
      width: '320px',

      data: {
        user_id: this.imageuser_id_auth,
        customer_id: this.customer_id,
        country_id: this.country_code,
      },
    };
    const dialogRef = this.dialog.open(UserProfileCardComponent, config);
  }

  //! -------------------------------  End  --------------------------------!//
}
