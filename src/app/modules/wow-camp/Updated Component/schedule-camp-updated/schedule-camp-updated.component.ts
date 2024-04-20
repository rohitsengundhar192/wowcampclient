import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { LoginRestrictionComponent } from 'src/app/shared/dialogs/login-restriction/login-restriction.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
interface Country {
  shortName: string;
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string[];
  emoji: string;
  emojiU: string;
}

@Component({
  selector: 'app-schedule-camp-updated',
  templateUrl: './schedule-camp-updated.component.html',
  styleUrls: ['./schedule-camp-updated.component.scss'],
})
export class ScheduleCampUpdatedComponent implements OnInit {
  countries: Country[];
  filteredCountries: any;
  formValues: any;
  city_1: any = ([] = []);
  changecountryid: any;
  location: any;
  locationName: any;
  dataa: any;
  travel_data: any;

  data_json: any;
  ELEMENT_DATA: PeriodicElement[] = [];
  submitBtnStatus: boolean = false;

  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild('radio') radio: MatRadioButton;
  firstFormGroup = this._formBuilder.group({
    country1: ['', Validators.required],
  });

  get city() {
    return this.firstFormGroup.get('city');
  }

  isLogin = false;

  constructor(
    public dialog: MatDialog,
    private change: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private service: CountryStateCityService,
    public data_sharing: DataSharingService,
    private authService: JwtAuthService
  ) {}
  country_code: any;
  customer_id: any;
  user_id_login: any;
  user_registration_login_approval_status: any;
  hidecontent: boolean = false;
  ngOnInit() {
    this.data_sharing.updateAuditTrailData('schdeule_camp');
    this.data_sharing.update_showTop_data(false);
    // this.data_sharing.update_show_side(true);
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.user_registration_login_approval_status = token.user.user_registration_login_approval_status;
    if (this.user_registration_login_approval_status === 3) {
      console.log('showing html content');
      this.hidecontent = false; // Show the HTML content
    } else {
      console.log('open dialogue');
      this.hidecontent = true; // Hide the HTML content

      const dialogRef = this.dialog.open(LoginRestrictionComponent, {
        disableClose: true,
        height: 'auto',
        width: '350px',
        minWidth: '350px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.hidecontent = this.user_registration_login_approval_status !== 3;
      });
    }

    // this.data_sharing.update_showTop_data(false);
    // const dialogRef = this.dialog.open(PopupcomponentComponent, {
    //   width: '500px',
    //   height: '30px',
    // });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   this.isLogin = result.data.login_status;
    // });
    this._headerTitle.setTitle('Schedule Camp Trip / Activity Groups');
  }

  ngOnDestroy() {
    if (this.data_sharing.updateAuditTrailData) {
      this.data_sharing.updateAuditTrailData(undefined);
    }
  }
}
