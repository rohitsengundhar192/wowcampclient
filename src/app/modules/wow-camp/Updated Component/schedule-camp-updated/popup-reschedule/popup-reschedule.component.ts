import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
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
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { DateTime } from 'luxon';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserProfileCardComponent } from 'src/app/shared/dialogs/user-profile-card/user-profile-card.component';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { Observable, map, startWith } from 'rxjs';
// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { DateAdapter } from '@angular/material/core';
export interface PeriodicElement {
  col1: number;
  col2: number;
  col3: string;
}
interface acti {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-popup-reschedule',
  templateUrl: './popup-reschedule.component.html',
  styleUrls: ['./popup-reschedule.component.scss'],
})
export class PopupRescheduleComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//

  actis: acti[] = [
    { value: 'Cls1', viewValue: 'Grade 6 and 7 group' },
    { value: 'Cls2', viewValue: 'Grade 7 and 8 group' },
    { value: 'Cls3', viewValue: 'Grade 8 and 9 group' },
  ];
  firstFormGroup = this._formBuilder.group({
    acti2: ['', Validators.required],
    vol1: ['', Validators.required],
    pa: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    calender: ['', Validators.required],
    par12: ['', Validators.required],
  });

  get acti2() {
    return this.firstFormGroup.get('acti2');
  }
  get vol1() {
    return this.firstFormGroup.get('vol1');
  }
  get pa() {
    return this.firstFormGroup.get('pa');
  }
  get country() {
    return this.firstFormGroup.get('country');
  }
  get city() {
    return this.firstFormGroup.get('city');
  }
  get par12() {
    return this.firstFormGroup.get('par12');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  ScheduleTrip: any;
  camp_id: any;

  filteredCountries: any;
  formValues: any;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  @ViewChild('radio') radio: MatRadioButton;
  country_code: any;
  customer_id: any;
  datesToHighlight: any[] = [];
  reddatesToHighlight: any[];
  greendatesToHighlight: any[];
  rosedatesToHighlight: any[];
  ress: any;
  morning_t: any;
  night_t: any;
  selectData: any;
  count_of_total: number = 0;
  count_of_voluteer: number = 0;
  trip_id: any;
  group_name: any;
  camp_name: any;
  over_night_booked: any;
  trip_id_req: any;
  camp_names: any;
  datees: any;
  dddd: any;
  selected_date: any;
  camp_id_get: any;
  display_date: any;
  no_day_tent_available: any;
  no_night_tent_available: any;
  corect_Date: any;
  showdate_data: any;
  slice_date: any;
  morning_tent: any;
  night_tent: any;
  city_1: any;
  country_id: any;
  dataa: any;
  changecountryid: any;
  getcamp_id: any;
  locationName: any;
  gruop_id: any;
  place: any;
  camp_id_req: any;
  over_nit_gruop_id: any;
  a: any[] = [];
  sep_vol_par: any;
  user_id_login: any;
  minDate: Date;
  maxDate: Date;
  popupbtndisable: boolean = true;
  com: any;
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
    private _tokenService: TokenService,
    private dateAdapter: DateAdapter<Date>,
    public loginDialogRef: MatDialogRef<PopupRescheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const today = this.dateAdapter.today();
    const tomorrow = this.dateAdapter.addCalendarDays(today, 1); // Get the day after today
    this.minDate = tomorrow;
  }
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;

    this._headerTitle.setTitle('Schedule Camp Trip / Activity Groups');
    console.log(this.data, 'data');
    this.trip_id_req = this.data.activity_group_trip_id;
    this.camp_id_found = this.data.camp_id;

    this.firstFormGroup.controls['calender'].setValue(this.data.trip_datetime);

    if (this.camp_id_found != undefined) {
      let green_dates: any[] = [];
      let red_dates: any[] = [];
      let rose_dates: any[] = [];
      this._apiService
        .getcalenderdatanew(
          this.country_code,
          this.customer_id,
          this.camp_id_found
        )
        .subscribe((res) => {
          if (res.data?.length != 0) {
            this.ress = res.data;

            for (let i = 0; i < this.ress.length; i++) {
              let tent_count: number = this.ress[i].tent_count;
              if (tent_count == 0) {
                red_dates.push(this.ress[i].date);
              } else {
                green_dates.push(this.ress[i].date);
              }
              this.com = this.ress[i].common_holidays;
            }
            for (let p = 0; p < this.com.length; p++) {
              const element = this.com[p];
              rose_dates.push(element.common_holiday_date);
            }
            this.reddatesToHighlight = red_dates;
            this.greendatesToHighlight = green_dates;
            this.rosedatesToHighlight = rose_dates;

            this.isDateDisabled = (d: Date): boolean => {
              const dateString = DateTime.fromISO(d?.toISOString().slice(0, 10))
                .plus({ days: 1 })
                .toISODate();

              const isRoseDate =
                this.rosedatesToHighlight?.includes(dateString);
              const isRedDate = this.reddatesToHighlight?.includes(dateString);

              // Enable dates that are in rosedatesToHighlight and not in reddatesToHighlight
              if (isRoseDate && !isRedDate) {
                return true;
              }

              return false; // Disable the date
            };

            res.data.map((item: any) => {
              this.datesToHighlight.push(item.green_dates);
              this.datesToHighlight.push(item.red_dates);
            });
          }
        });
    }
  }

  //* ----------------------------  APIs Methods  --------------------------*//



  resheduleTripupdate() {
    this._apiService
      .reschdeuletripUpdate(
        this.country_code,
        this.customer_id,
        this.user_id_login,
        this.camp_id_found,
        this.trip_id_req,
        this.datees
      )
      .subscribe((res) => {
        if (res.statusCode == 200) {
          this._snackbar.success(res.message);
          this.count_of_total = undefined;
          this.onNoClick();
          this.count_of_voluteer = undefined;
          this.trip_id = undefined;
          this.selectData = [];
          this.city_1 = [];
        } else {
          this._snackbar.error(res.message);
        }
      });
  }
  releasedAtPicker: any;
  isDateDisabled: any;

  dateClass = (date: Date): MatCalendarCellCssClasses | any => {
    const momentDate = moment(date); // Convert to Moment.js object
    const jsDate = momentDate.toDate(); // Convert to JavaScript Date object

    let highlightDate = false;
    if (this.reddatesToHighlight) {
      highlightDate = this.reddatesToHighlight
        .map((strDate: any) => moment(strDate).format('YYYY-MM-DD')) // Convert Moment.js object to a valid date string
        .some(
          (item) =>
            moment(item).year() === moment(jsDate).year() &&
            moment(item).date() === moment(jsDate).date() &&
            moment(item).month() === moment(jsDate).month()
        );

      if (highlightDate) {
        return 'red-custom-date-class';
      }
    }

    if (this.rosedatesToHighlight) {
      highlightDate = this.rosedatesToHighlight
        .map((strDate: any) => moment(strDate).format('YYYY-MM-DD')) // Convert Moment.js object to a valid date string
        .some(
          (d) =>
            moment(d).date() === moment(jsDate).date() &&
            moment(d).month() === moment(jsDate).month() &&
            moment(d).year() === moment(jsDate).year()
        );

      if (highlightDate) {
        return 'rose-custom-date-class';
      }
    }

    return undefined;
  };

  selectactivity() {
    // this._spiner.open();
    this._apiService
      .sechduleselectactivity(
        this.country_code,
        this.customer_id,
        this.camp_id_req
      )
      .subscribe((res) => {
        if (res.data?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }

        if (res.data?.camp_id_data?.length == 0) {
          this._snackbar.success('Data Not Found');
          // this._spiner.close();
        }
        if (res) {
          this._spiner.close();
        }

        if (res.data?.camp_id_data?.length != 0) {
          this.selectData = res.data;
        }
      });
  }

  onNoClick() {
    this.loginDialogRef.close();
  }
  disableschedule: boolean = true;

  OnDateChange(e: any) {
    this.corect_Date = this.corect_Date = new Date(e._d).getUTCDate();
  }

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//

  selec_date: any;
  onselected(e: any) {
    this.selec_date = DateTime.fromJSDate(e.value._d).toFormat('yyyy-MM-dd');
    this._apiService
      .calenderAvailability(
        this.country_code,
        this.customer_id,
        this.camp_id,
        this.datees
      )
      .subscribe((res) => {
        if (res.data?.over_all_push?.length == 0) {
          this._snackbar.success('Data Not Found');
          this._spiner.close();
        }

        this.no_day_tent_available = res.data[0].tent_available_in_day;
        this.no_night_tent_available =
          res.data[0].over_all_night_tent_avaliable;
        this.camp_names = res.data[0].camp_name;
      });
  }
  selectcheck: any;
  total_tent_count: any;
  camp_id_found: any;
  onSelect(e: any) {
    this.selectcheck = e.value._pf.overflow;
    this.popupbtndisable = false;
    this.selected_date = e.value.toISOString();
    this.datees = DateTime.fromJSDate(e.value._d).toFormat('yyyy-MM-dd');
    this.display_date = DateTime.fromJSDate(e.value._d).toFormat(
      'yyyy-MM-dd TT'
    );
    this._apiService
      .getcalenderdatanew(
        this.country_code,
        this.customer_id,
        this.camp_id_found
      )
      .subscribe((res) => {
        if (res.data?.over_all_push?.length == 0) {
          this._snackbar.success('Data Not Found');
        }

        this.showdate_data = res.data;

        this.total_tent_count = this.showdate_data[0].total_tent_count;

        let return_data = this.showdate_data.find((resss: any) => {
          this.slice_date = resss.date;

          if (this.slice_date === this.datees) {
            return resss;
          }
        });

        if (return_data) {
          this.morning_tent = return_data.mrng_tent;
          this.night_tent = return_data.night_Tent;
        } else {
          this.morning_tent = this.total_tent_count;
          this.night_tent = this.total_tent_count;
        }
      });
  }
  imageuser_id: any;
  isrowselectedfirstreply(e: any) {
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
