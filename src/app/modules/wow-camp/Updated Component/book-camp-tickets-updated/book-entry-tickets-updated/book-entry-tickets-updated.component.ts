import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import * as XLSX from 'xlsx';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { first, Observable, Subscriber } from 'rxjs';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { DateTime } from 'luxon';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { TokenService } from 'src/app/shared/services/api/token.service';
// import { IframeComponent } from '../../../book-camp-tickets/iframe/iframe.component';
// import { IframeComponent } from '../iframe/iframe.component';
import { IframeComponent } from '../iframe/iframe.component';
import { uniqBy } from 'lodash';
import { icon, Marker } from 'leaflet';
import * as Leaflet from 'leaflet';
import * as L from 'leaflet';
import { MapLeafletComponent } from '../../../map-leaflet/map-leaflet.component';
import { CKEditorComponent } from 'ng2-ckeditor';
import { WowWalletComponent } from '../../../wow-wallet/wow-wallet.component';
import { GetWalletPopUpComponent } from 'src/app/shared/dialogs/get-wallet-pop-up/get-wallet-pop-up.component';
import { WowWalletPopUpComponent } from 'src/app/shared/dialogs/wow-wallet-pop-up/wow-wallet-pop-up.component';

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

interface sel {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-book-entry-tickets-updated',
  templateUrl: './book-entry-tickets-updated.component.html',
  styleUrls: ['./book-entry-tickets-updated.component.scss'],
})
export class BookEntryTicketsUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio: MatRadioButton;
  @Output() categoryId = new EventEmitter();
  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;
  @Input()
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
  sels: sel[] = [
    { value: 'Cls1', viewValue: 'Student/Class 1/Section A' },
    { value: 'Cls2', viewValue: 'Student/Class 2/Section B' },
    { value: 'Cls3', viewValue: 'Student/Class 3/Section C' },
  ];
  firstFormGroup = this._formBuilder.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    activity1: ['', Validators.required],
    sel1: ['', Validators.required],
    category: ['', Validators.required],
    cdk_editor: new FormControl(),
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
  btndisable = false;
  formValues: any;
  city_1: any = ([] = []);
  changecountryid: any;
  location: any;
  locationName: any;
  dataa: any;
  travel_data: any;
  tables: any;
  details: any;
  table_data: any;
  cantegory_name: any;
  data_json: any;
  user_category_id: any;
  downloadforms: any;
  isLogin = false;
  category: any;
  select_category$: Observable<any>;
  catgoryname: any;
  value1: any;
  s: any;
  category_id: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  control: FormControl;
  BookEntryTickets: any;
  country_code: any;
  customer_id: any;
  country_id: any;
  btndisable_1 = true;
  get_wow_amount: any;
  getuser_id: any;
  get_wow_user_id: any;
  get_get_amount: any;
  get_get_user_id: any;
  ticketprice: any;
  ticketgetprice: any;
  getcampid: any;
  ticketvolunteerprice: any;
  btnDisabled = true;
  show_table: boolean;
  user_id_login: any;
  @ViewChild('myckeditor') myckeditor!: CKEditorComponent;
  ckeConfig!: any;
  countries: Country[] = [];
  CountryfilteredOptions!: Observable<Country[]>;
  readonlydata: boolean = true;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _headerTitle: HeaderTitleService,
    private _dataShare: DataSharingService,
    private _snack: MatSnackBar,
    private _snackbar: SnackBarService,
    private service: CountryStateCityService,
    private api_service: ApiService,
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

    this._headerTitle.setTitle('Book Camp Tickets');

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

    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removePlugins: 'exportpdf',

      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        {
          name: 'paragraph',
          // groups: ['colors'],
        },
      ],
      removeButtons:
        'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Outdent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Unlink,Anchor,Flash,orizontalRule,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About',
    };
    this.categoryget();

    if (
      this.getcampid != undefined &&
      this.user_category_id.user_category_id != undefined
    ) {
      this._dataShare.reload_table_bookwow_data.subscribe((res) => {
        if (res == 1) {
          this.api_service
            .data_tableTickets(
              this.country_code,
              this.customer_id,
              this.user_category_id.user_category_id,
              this.getcampid
            )
            .subscribe((res) => {
              this.contact_addstudents = res.data;

              if (res.data?.get_result?.length == 0) {
                this._snackbar.success('Data Not Found');
              }

              if (res.data?.length == 0) {
                this._snackbar.success('Data Not Found');
              }
              if (res) {
              }
              this.categoryId.emit(this.user_category_id);
              this.details = res.data;
              const uniqueData = uniqBy(
                res.data,
                'user_id'
              ) as unknown as PeriodicElement[];
              this.dataSource.data = uniqueData;
            });
        }
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
  //* ----------------------------  APIs Methods  --------------------------*//
  getval(selectedVal: any) {
    // let val = selectedVal.name;
    this.city_1 = [];
    this.btndisable_1 = true;
    this.showdata = false;
    this.dataSource.data = [];
    this.firstFormGroup.get('cdk_editor').setValue('');
    // this.firstFormGroup.controls['country'].setValue(val);
    // console.log(selectedVal.shortName, 'se');

    this.api_service
      .NearestCampSiteTickets(selectedVal.shortName)
      .subscribe((data) => {
        this.city_1 = data.data;

        if (data.statusCode == 200) {
          // this._snackbar.success(data.message);
        } else {
          this._snackbar.success(data.message);
        }
      });
  }
  categoryget() {
    this.api_service
      .selectCategoryTickets(this.country_code, this.customer_id)
      .subscribe((data) => {
        if (data) {
          this._spiner.close();
        }
        this.s = data.data;
      });
  }

  getCountryData(data: any) {
    this.country_id = data;
    this.api_service.NearestCampSiteTickets(data).subscribe((data) => {
      this.city_1 = data.data;

      if (data.statusCode == 400) {
        this._snackbar.success(data.message);
        // this.show_table = false;
      }
    });
  }
  selected_userid: any;
  wow_get_amont: any;
  disabledata: any;
  disabled(element: any) {
    this.wallet_transaction_id = [];
    this.getvolunteerwallet_transaction_id = [];
    this.btndisable_1 = false;
    this.disabledata = element;
    this._dataShare.radioButtonFunctionTicket(false);
    this._dataShare.disabledData(element);
    this.get_wow_amount = element.getwowbalanceamount;

    if (+this.get_wow_amount <= +this.ticketvolunteerprice) {
      this.btndisable_1 = true;
    }
    this.get_wow_user_id = element.user_id;
    this.selected_userid = element.user_id;
    this.get_get_amount = element.getgetbalanceamount;
    this.wow_get_amont = element.getwowbalanceamount;
    this.get_get_user_id = element.getuser_id_of_get_wallet;
    this.getuser_id = element.checkusercampbooking.length;
    // console.log(this.getuser_id, 'get');

    this._dataShare.shareUserGetId(this.selected_userid);

    this._dataShare.shareWowAmountId(element);

    this.selected_user_id = [element];
  }

  //bookwowticket
  wallet_transaction_id: any = 1;
  transaction_id: number = 1;
  bookticket(val: any) {
    // console.log(this.getuser_id, 'bookticket');
    this._spiner.open();
    this.api_service.BookwowTicket(val).subscribe((res) => {
      this._spiner.close();
      if (res.data?.length == 0) {
        this._snackbar.success('Data Not Found');
        this._spiner.close();
      }
      if (res.data?.overall_result?.length == 0) {
        this._snackbar.success('Data Not Found');
        this._spiner.close();
      }
      if (res) {
        this._spiner.close();
      }
      this.ticketprice = res.data[0].wow_ticket_price;
      this._dataShare.shareTicketPriceId(this.ticketprice);

      if (this.getuser_id != 0) {
        this._snack.open('User already Booked', 'Ok', this.config);
        this.btndisable_1 = true;
        this.tables = [];
        this.getuser_id = [];
      } else if (+this.get_wow_amount >= +this.ticketprice) {
        this._dataShare.setWalletType(0);
        this.openwow();
        // if (this.ticketprice != undefined) {
        //   this.api_service
        //     .BookwowTicketUpdate(
        //       this.country_code,
        //       this.customer_id,
        //       this.user_id_login,
        //       this.selected_userid,
        //       this.getcampid,
        //       this.getvolunteerwallet_transaction_id_stat
        //     )
        //     .subscribe((res) => {
        //       this._snack.open('congratulation', 'sucess', this.config);
        //       this._spiner.open();
        //       this.btndisable_1 = true;
        //       this.tables = [];
        //       this.api_service
        //         .data_tableTickets(
        //           this.country_code,
        //           this.customer_id,
        //           this.user_category_id.user_category_id,
        //           this.getcampid
        //         )
        //         .subscribe((res) => {
        //           this.contact_addstudents = res.data;
        //           // console.log(this.contact_addstudents, 'cont');

        //           if (res.data?.get_result?.length == 0) {
        //             this._snackbar.success('Data Not Found');
        //           }

        //           if (res.data?.length == 0) {
        //             this._snackbar.success('Data Not Found');
        //           }
        //           if (res) {
        //             this._spiner.close();
        //           }
        //           this.categoryId.emit(this.user_category_id);
        //           this.details = res.data;
        //           const uniqueData = uniqBy(
        //             res.data,
        //             'user_id'
        //           ) as unknown as PeriodicElement[];
        //           // console.log(uniqueData, 'unique');

        //           this.dataSource.data = uniqueData;
        //         });
        //     });
        // }
      } else {
        this._snack.open('Insufficient fund', 'OK', this.config);
        this.btndisable_1 = true;
        this.tables = [];
        this.getuser_id = [];
      }
    });
  }

  checkalreadyuseridinwavierform: any;
  data_for_checked() {
    let filterdata = (user_id: any) => {
      for (let i = 0; i < this.selected_user_id.length; i++) {
        if (this.selected_user_id[i].user_id == user_id) {
          return 0;
        }
      }
      return -1;
    };

    for (let p = 0; p < this.contact_addstudents.length; p++) {
      if (filterdata(this.contact_addstudents[p].user_id) == 0) {
        this.checkalreadyuseridinwavierform =
          this.contact_addstudents[p].user_id;
      }
    }
  }
  openDialog() {
    this.dialog.open(WowWalletComponent, {
      width: '320px',
      maxHeight: '500px',
      disableClose: true,
    });
  }

  //bookgetticket
  entry_ticket_debit_transaction_id: number = 1;
  bookgetticket(val: any) {
    this._spiner.open();
    this.api_service.BookgetTicket(val).subscribe((res) => {
      if (res.data?.length == 0) {
        this._snackbar.success('Data Not Found');
        this._spiner.close();
      }
      if (res.data?.overall_result?.length == 0) {
        this._snackbar.success('Data Not Found');
        this._spiner.close();
      }
      if (res) {
        this._spiner.close();
      }
      this.ticketgetprice = res.data[0].get_ticket_price;
      // console.log(this.ticketgetprice, 'tickert');

      this._dataShare.shareTicketPriceId(this.ticketgetprice);

      if (this.getuser_id != 0) {
        this._snack.open('User already Booked', 'OK', this.config);
      } else if (+this.get_get_amount >= +this.ticketgetprice) {
        this.openget();
      } else {
        this._snack.open('Insufficient fund', 'OK', this.config);
      }
    });
  }
  //bookvolunteerticket
  getvolunteerwallet_transaction_id_stat: number = 1;
  bookvolunteerticket(val: any) {
    // console.log(this.getuser_id, 'volticket');
    this._spiner.open();
    this.api_service.BookvolunteerTicket(val).subscribe((res) => {
      if (res.data?.overall_result?.length == 0) {
        this._snackbar.success('Data Not Found');
        this._spiner.close();
      }
      if (res.data?.length == 0) {
        this._snackbar.success('Data Not Found');
        this._spiner.close();
      }
      if (res) {
        this._spiner.close();
      }
      this.ticketvolunteerprice = res.data[0].wow_ticket_price;
      // console.log(this.ticketvolunteerprice,'ticket');

      this._dataShare.shareTicketPriceId(this.ticketvolunteerprice);
      if (this.getuser_id != 0) {
        this._snack.open('User already Booked', 'OK', this.config);
        this.btndisable_1 = true;
        this.tables = [];
        this.getuser_id = [];
      } else if (+this.get_wow_amount >= +this.ticketvolunteerprice) {
        this._dataShare.setWalletType(1);
        this.openvolunteer();
        // if (this.getvolunteerwallet_transaction_id != null) {
        //   this._snack.open('congratulation', 'sucess', this.config);
        //   this.api_service
        //     .BookvolunteerTicketUpdate(
        //       this.country_code,
        //       this.customer_id,
        //       this.user_id_login,
        //       this.selected_userid,
        //       this.getcampid,
        //       this.getvolunteerwallet_transaction_id_stat
        //     )
        //     .subscribe((res) => {
        //       this.btndisable_1 = true;
        //       this.tables = [];
        //       this.api_service
        //       .data_tableTickets(
        //         this.country_code,
        //         this.customer_id,
        //         this.user_category_id.user_category_id,
        //         this.getcampid
        //       )
        //       .subscribe((res) => {
        //         this.contact_addstudents = res.data;
        //         if (res.data?.get_result?.length == 0) {
        //           this._snackbar.success('Data Not Found');
        //         }

        //         if (res.data?.length == 0) {
        //           this._snackbar.success('Data Not Found');
        //         }
        //         if (res) {
        //           this._spiner.close();
        //         }
        //         this.categoryId.emit(this.user_category_id);
        //         this.details = res.data;
        //         const uniqueData = uniqBy(
        //           res.data,
        //           'user_id'
        //         ) as unknown as PeriodicElement[];

        //         this.dataSource.data = uniqueData;
        //         console.log(uniqueData,'vol ticket');
        //         this.getuser_id=[];

        //       });
        //     });
        // }
      } else {
        this._snack.open('Insufficient fund', 'OK', this.config);
        this.btndisable_1 = true;
        this.tables = [];
        this.getuser_id = [];
      }
    });
  }
  co: any;
  co_code: any;
  map_location_x: any;
  map_location_y: any;
  geo_data: any;
  travel_Datas: any;
  marker: any;
  getfence_data: any;
  popup: any;
  rowvalues: any;
  btndisablecreate: boolean = true;
  getNearestlocation(data1: any) {
    this.locationName = data1;
    // console.log(this.locationName, 'loc');
    this._dataShare.shareCampId(this.locationName);
    this.getcampid = this.locationName.camp_id;
    this.btndisablecreate = false;
    this.showdata = true;
    this.btndisable_1 = true;

    this.api_service.ticketdatajson(this.getcampid).subscribe((getdata_1) => {
      if (getdata_1.statusCode == 400) {
        this._snackbar.success(getdata_1.message);
      }

      this.travel_data =
        getdata_1.data[0].edu_ticket_details_and_terms_and_conditions;

        console.log(this.travel_data,'tavs');
        

      this.firstFormGroup.controls['cdk_editor'].setValue(
        getdata_1.data[0].edu_ticket_details_and_terms_and_conditions
      );
    });

    this._spiner.open();
    this.api_service
      .data_tableTickets(
        this.country_code,
        this.customer_id,
        this.user_category_id.user_category_id,
        this.getcampid
      )
      .subscribe((res) => {
        this.contact_addstudents = res.data;
        // console.log(this.contact_addstudents, 'cont');

        if (res.data?.get_result?.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        if (res.data?.length == 0) {
          this._snackbar.success('Data Not Found');
        }
        if (res) {
          this._spiner.close();
        }
        this.categoryId.emit(this.user_category_id);
        this.details = res.data;
        const uniqueData = uniqBy(
          res.data,
          'user_id'
        ) as unknown as PeriodicElement[];
        // console.log(uniqueData, 'unique');

        this.dataSource.data = uniqueData;
      });
    this.geo_data = data1;
    this.location = data1;
    this.map_location_x = this.location?.camp_gps_coordinates?.x;
    this.map_location_y = this.location?.camp_gps_coordinates?.y;
    this.let_data = this.map_location_x;
    this.lng_data = this.map_location_y;
    this.rowvalues = this.locationName;

    this.dataSource.data = [];
    this.tables = [];
  }

  selectCategory() {
    this._spiner.open();
    this.api_service
      .selectCategoryTickets(this.country_id, this.customer_id)
      .subscribe((data_1) => {
        if (data_1) {
          this._spiner.close();
          this.btnDisabled = false;
        }
        this.category = data_1;
        // this.show_table = true;
        this.category_id;
        this.translateMatPaginator(this.paginator);
      });
  }
  selected_user_id: any;
  contact_addstudents: any;
  showdata: boolean = false;
  select(e: any) {
    this.cantegory_name = e?.user_category_name;
    this.category_id = e.user_category_id;
    this.btnDisabled = false;
    this.btndisablecreate = true;
    this.showdata = false;
    this.city_1 = [];
    this.btndisable_1 = true;
    this.dataSource.data = [];
    this.firstFormGroup.get('cdk_editor').setValue('');
    this.firstFormGroup.get('country').setValue(null);
    // Mark the control as valid to remove the red error border
    this.firstFormGroup.get('country').markAsUntouched();
    this.firstFormGroup.get('country').markAsPristine();
  }

  onRowClicked(row: any) {}

  openmap() {
    if (this.locationName?.camp_id != undefined) {
      const dialogRef = this.dialog.open(MapLeafletComponent, {
        disableClose: true,
        height: 'auto',
        width: '350px',
        minWidth: '350px',
        data: this.rowvalues,
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  //* --------------------------  Public methods  --------------------------*//
  let_data: any;
  lng_data: any;
  topLeft: any;
  bottomLeft: any;
  topRight: any;
  bottomRight: any;
  sameTopLeft: any;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapbox.accessToken,
      }),
    ],
    zoom: 10,
    center: { lat: 28.626137, lng: 79.821603 },
  };

  initialMarkers: any[] = [];

  initMarkers() {
    for (let index = 0; index < this.initialMarkers.length; index++) {
      const data = this.initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup('your location');
      this.map.flyTo(data.position);
      this.markers.push(marker);

      if (this.topLeft['x'] != undefined) {
        // Polygon
        var polygon: any[] = [
          [this.topLeft['x'], this.topLeft['y']],
          [this.bottomLeft['x'], this.bottomLeft['y']],
          [this.topRight['x'], this.topRight['y']],
          [this.bottomRight['x'], this.bottomRight['y']],
          [this.sameTopLeft['x'], this.sameTopLeft['y']],
        ];
        L.rectangle(polygon, {
          color: 'yellow',
          weight: 5,
          fillColor: 'blue',
        }).addTo(this.map);
      }
    }
  }

  mapClicked($event: any) {}

  markerClicked($event: any, index: number) {}

  markerDragEnd($event: any, index: number) {}
  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }
  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
    this.getCurrentPosition().subscribe((position: any) => {
      this.map.flyTo([position.latitude, position.longitude], 14);

      const iconRetinaUrl = 'assets/marker-icon-2x.png';
      const iconUrl = 'assets/marker-icon.png';
      const shadowUrl = 'assets/marker-shadow.png';
      const iconDefault = icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });
      Marker.prototype.options.icon = iconDefault;

      const marker = L.marker(
        [position.latitude, position.longitude],
        {}
      ).bindPopup('Current Location');
      marker.addTo(this.map);
    });
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
  checkcou_city_cat() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
    if (this.firstFormGroup.get('city').hasError('required')) {
      this.firstFormGroup.controls['city'].markAsTouched();
    }
    if (this.firstFormGroup.get('category').hasError('required')) {
      this.firstFormGroup.controls['category'].markAsTouched();
    }
  }
  onAddressFormSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.formValues = value;
  }

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }
  displayedColumns: any = ['col1', 'col2', 'col3', 'col4'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.translateMatPaginator(this.paginator);
  }

  table_json_data: any;

  loadData() {
    this.api_service
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

  loaddata() {
    this.api_service
      .data_tableTickets(
        this.country_code,
        this.customer_id,
        this.user_category_id.user_category_id,
        this.getcampid
      )
      .subscribe((res) => {
        this.contact_addstudents = res.data;
        // console.log(this.contact_addstudents, 'cont');

        console.log('worksS');

        if (res.data?.get_result?.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        if (res.data?.length == 0) {
          this._snackbar.success('Data Not Found');
        }
        if (res) {
          this._spiner.close();
        }
        this.categoryId.emit(this.user_category_id);
        this.details = res.data;
        const uniqueData = uniqBy(
          res.data,
          'user_id'
        ) as unknown as PeriodicElement[];

        this.dataSource.data = uniqueData;
      });
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loaddata();
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
    let categorysss = this.cantegory_name;

    let jwt_token = localStorage.getItem('access_token');
    let token1 = this._tokenService.decodeJwtToken(jwt_token);

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
          <img style="width:100px;height:100px" src="${customer_logo}" alt="app-logo" />            <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">USERs WITH VALID CAMP PARTICIPATION APPROVAL AND WAIVER FORM AND REGISTERED UNDER USER CATEGORY: </span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase"> ${categorysss}</span>
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
    const fileName = e.customer_image.split('.')[0]; // Split the string by '.' and take the first part
    this.imageuser_id = parseInt(fileName); // Parse the resulting string to an integer
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
  isrowselectedfirstreplyvol(e: any) {
    console.log(e);

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
  openwow() {
    const dialogRef = this.dialog.open(WowWalletPopUpComponent, {
      disableClose: true,
      height: 'auto',
      width: '360px',
      minWidth: '250px',
      data: this.disabledata,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result,'resutl');

      this.btndisable_1 = true;
      this.tables = [];
      this.api_service
        .data_tableTickets(
          this.country_code,
          this.customer_id,
          this.user_category_id.user_category_id,
          this.getcampid
        )
        .subscribe((res) => {
          this.contact_addstudents = res.data;
          // console.log(this.contact_addstudents, 'cont');

          if (res.data?.get_result?.length == 0) {
            this._snackbar.success('Data Not Found');
          }

          if (res.data?.length == 0) {
            this._snackbar.success('Data Not Found');
          }
          if (res) {
            this._spiner.close();
          }
          this.categoryId.emit(this.user_category_id);
          this.details = res.data;
          const uniqueData = uniqBy(
            res.data,
            'user_id'
          ) as unknown as PeriodicElement[];

          this.dataSource.data = uniqueData;
        });

      this.api_service
        .BookvolunteerTicketUpdate(
          this.country_code,
          this.customer_id,
          this.user_id_login
        )
        .subscribe((res) => {
          console.log(res, 'post succefully');
        });
    });
  }

  getwallet_transaction_id: any;
  openget() {
    const dialogRef = this.dialog.open(GetWalletPopUpComponent, {
      disableClose: true,
      height: 'auto',
      width: '360px',
      minWidth: '250px',
      // data:row
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getwallet_transaction_id = [];

      this._dataShare.share_get_wmount_get_id_data
        .pipe(
          first() // or take(1)
        )
        .subscribe((res) => {
          console.log(res, 'ress from get');
          if (
            typeof res === 'string' &&
            res.startsWith('[') &&
            res.endsWith(']')
          ) {
            // Remove square brackets from the string and parse it as an integer
            this.getwallet_transaction_id = parseInt(res.slice(1, -1), 10);
            // console.log(this.getwallet_transaction_id, 'getwaller');
            if (this.getwallet_transaction_id != null) {
              this._snack.open('congratulation', 'sucess', this.config);
              this.api_service
                .BookgetTicketUpdate(
                  this.country_code,
                  this.customer_id,
                  this.user_id_login,
                  this.selected_userid,
                  this.getcampid,
                  this.getwallet_transaction_id
                )
                .subscribe((res) => {
                  this.btndisable_1 = true;
                  this.tables = [];
                  this.api_service
                    .data_tableTickets(
                      this.country_code,
                      this.customer_id,
                      this.user_category_id.user_category_id,
                      this.getcampid
                    )
                    .subscribe((res) => {
                      this.contact_addstudents = res.data;
                      // console.log(this.contact_addstudents, 'cont');

                      if (res.data?.get_result?.length == 0) {
                        this._snackbar.success('Data Not Found');
                      }

                      if (res.data?.length == 0) {
                        this._snackbar.success('Data Not Found');
                      }
                      if (res) {
                        this._spiner.close();
                      }
                      this.categoryId.emit(this.user_category_id);
                      this.details = res.data;
                      const uniqueData = uniqBy(
                        res.data,
                        'user_id'
                      ) as unknown as PeriodicElement[];

                      this.dataSource.data = uniqueData;
                    });
                });
            }
          } else {
            console.log('Invalid data format');
          }
        });

      // this._dataShare.share_get_wmount_get_id_data.subscribe((res) => {

      //   console.log(res,'ress from get');

      //   if (
      //     typeof res === 'string' &&
      //     res.startsWith('[') &&
      //     res.endsWith(']')
      //   ) {
      //     // Remove square brackets from the string and parse it as an integer
      //     this.getwallet_transaction_id = parseInt(res.slice(1, -1), 10);
      //     console.log(this.getwallet_transaction_id,'getwaller');
      //     if (this.getwallet_transaction_id != null) {
      //       this._snack.open('congratulation', 'sucess', this.config);
      //       this.api_service
      //         .BookgetTicketUpdate(
      //           this.country_code,
      //           this.customer_id,
      //           this.user_id_login,
      //           this.selected_userid,
      //           this.getcampid,
      //           this.getwallet_transaction_id
      //         )
      //         .subscribe((res) => {
      //           this.btndisable_1 = true;
      //           this.tables = [];
      //           this.api_service
      //             .data_tableTickets(
      //               this.country_code,
      //               this.customer_id,
      //               this.user_category_id.user_category_id,
      //               this.getcampid
      //             )
      //             .subscribe((res) => {
      //               this.contact_addstudents = res.data;
      //               console.log(this.contact_addstudents, 'cont');

      //               if (res.data?.get_result?.length == 0) {
      //                 this._snackbar.success('Data Not Found');
      //               }

      //               if (res.data?.length == 0) {
      //                 this._snackbar.success('Data Not Found');
      //               }
      //               if (res) {
      //                 this._spiner.close();
      //               }
      //               this.categoryId.emit(this.user_category_id);
      //               this.details = res.data;
      //               const uniqueData = uniqBy(
      //                 res.data,
      //                 'user_id'
      //               ) as unknown as PeriodicElement[];

      //               this.dataSource.data = uniqueData;
      //             });
      //         });
      //     }
      //   } else {
      //     console.log('Invalid data format');
      //   }
      // });
    });
  }
  getvolunteerwallet_transaction_id: any;
  openvolunteer() {
    const dialogRef = this.dialog.open(GetWalletPopUpComponent, {
      disableClose: true,
      height: 'auto',
      width: '360px',
      minWidth: '250px',
      // data:row
      data: this.disabledata,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // this.getvolunteerwallet_transaction_id = [];
      this.btndisable_1 = true;
      this.tables = [];
      this.api_service
        .data_tableTickets(
          this.country_code,
          this.customer_id,
          this.user_category_id.user_category_id,
          this.getcampid
        )
        .subscribe((res) => {
          this.contact_addstudents = res.data;
          // console.log(this.contact_addstudents, 'cont');

          if (res.data?.get_result?.length == 0) {
            this._snackbar.success('Data Not Found');
          }

          if (res.data?.length == 0) {
            this._snackbar.success('Data Not Found');
          }
          if (res) {
            this._spiner.close();
          }
          this.categoryId.emit(this.user_category_id);
          this.details = res.data;
          const uniqueData = uniqBy(
            res.data,
            'user_id'
          ) as unknown as PeriodicElement[];

          this.dataSource.data = uniqueData;
        });

      this.api_service
        .BookvolunteerTicketUpdate(
          this.country_code,
          this.customer_id,
          this.user_id_login
        )
        .subscribe((res) => {
          console.log(res, 'post succefully');
        });
    });
  }
  //! -------------------------------  End  --------------------------------!//
}
