import { HeaderTitleService } from './../../../shared/services/header-title/header-title.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { CephService } from 'src/app/shared/services/ceph/cehp.service';
import { Observable, map, startWith } from 'rxjs';
// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { MatDialog } from '@angular/material/dialog';
import { WowcampVideoPopupComponent } from 'src/app/shared/dialogs/wowcamp-video-popup/wowcamp-video-popup.component';
import { WowWasteVideoComponent } from '../popup/wow-waste-video/wow-waste-video.component';

@Component({
  selector: 'app-get-wow-camp-guidelines',
  templateUrl: './get-wow-camp-guidelines.component.html',
  styleUrls: ['./get-wow-camp-guidelines.component.scss'],
})
export class GetWowCampGuidelinesComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  firstFormGroup = this._formBuilder.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
  });
  video_variables: any;

  countries: any[] = [];
  CountryfilteredOptions!: Observable<Country[]>;

  get country() {
    return this.firstFormGroup.get('country');
  }
  get city() {
    return this.firstFormGroup.get('city');
  }
  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  //* -----------------------  Variable Declaration  -----------------------*//

  posterSource: string = '';
  videoTotalDuration: number = 0;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  filteredCountries: any;
  video: any;
  isVideoLoaded: boolean = true;
  co: any;
  co_code: any;
  camp_id_select: any;
  bucketName_manage: any = 'getwow-education';
  imagedata: any[] = [];
  loopdata: any;
  video_variable: any;
  showvideo: boolean = false;
  dataa: any;
  city_1: any;
  changecountryid: any;
  country_id: any;
  showimage: boolean = true;
  formValues: any;
  currentactivity: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public data_sharing: DataSharingService,
    private _headertitle: HeaderTitleService,
    private _spiner: CustomSpinnerService,
    private _formBuilder: FormBuilder,
    private api_services: ApiService,
    private authService: JwtAuthService,
    private _snackbar: SnackBarService,
    private _cephService: CephService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this._headertitle.setTitle(`getWOW.camp Participation Guidelines`);
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.data_sharing.datasouce_table_change_data_id_data.subscribe(
      (res) => {}
    );
    this.data_sharing.update_showTop_data(false);
    //Get video load by default based on camp_id

    this.api_services.NearestCampSitetr(this.country_code).subscribe((res) => {
      this.city_1 = res.data;

      if (this.city_1[0].camp_id != null) {
        this.firstFormGroup.controls['city'].patchValue(this.city_1[0].camp_id);
        this.location_id_find = this.city_1[0].camp_id;
        this.camp_id_select = this.city_1[0].camp_id;

        // this.disable_location = false;
        this.selected_location = this.firstFormGroup.controls['city'].value;

        this.api_services
          .camp_video_guidelines(this.city_1[0].camp_id)
          .subscribe((camp_video_data) => {
            this.video =
              camp_video_data.data[0].camp_showcase_video_cloud_file_storage_id;

            this._cephService
              .getFileMultipleFilesBasedOnKeymanage(
                this.bucketName_manage,
                this.video
              )
              .subscribe((res) => {
                for (let k = 0; k < res.length; k++) {
                  const element = res[k];

                  (this.video_variables =
                    'data:video/mp4;base64,' + res[k].file),
                    (this.video_variable = this.video_variables);

                  if (this.video_variable != undefined) {
                    this.showimage = false;
                    this.showvideo = true;
                    this._spiner.close();
                  }
                }
              });

            if (camp_video_data.statusCode == 400) {
              this._snackbar.success(camp_video_data.message);
            }
          });
      } else {
        this.firstFormGroup.controls['city'].patchValue('null');

        this.selected_location = null;
        this.location_id_find = null;
      }

      if (this.city_1 != undefined) {
        this._spiner.close();
      }
      if (res.statusCode == 400) {
        this._snackbar.success(res.message);
      }
    });
    this.countries = countrycitystatejson.getCountries();
    this.CountryfilteredOptions = this.firstFormGroup.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        // console.log(value,'calue');

        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this.countryfilter(name as string)
          : this.countries.slice();
      })
    );
  }
  ngAfterViewInit(): void {
    const result = this.countries.find((s: any) => s.name === 'India');
    if (result) {
      this.firstFormGroup.controls['country'].patchValue(result);

      // Manually trigger change detection
      this.cdr.detectChanges();
    }
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
  resetAndSelectCountry(selectedOption: any) {
    // Reset the country form control before selecting a new country
    // this.firstFormGroup.controls['country'].setValue(null);

    // Call the getCountryCode method with the selected country
    this.getCountryCode(selectedOption);
  }
  selected_location: any;
  alocation_id_find: any;
  location_id_find: any;
  getCountryCode(selectedVal: any) {
    console.log(selectedVal.shortName, 'slect');

    this.api_services
      .NearestCampSitetr(selectedVal.shortName)
      .subscribe((res) => {
        this.city_1 = res.data;
        console.log(this.city_1, 'city');

        if (this.city_1 && this.city_1.length !== 0) {
          console.log('get city data works');

          // this._spiner.close();
          if (this.city_1[0].camp_id != null) {
            this.firstFormGroup.controls['city'].patchValue(
              this.city_1[0].camp_id
            );
            this.location_id_find = this.city_1[0].camp_id;

            // this.disable_location = false;

            this.api_services
              .camp_video_guidelines(this.city_1[0].camp_id)
              .subscribe((camp_video_data) => {
                this.video =
                  camp_video_data.data[0].camp_showcase_video_cloud_file_storage_id;

                this._cephService
                  .getFileMultipleFilesBasedOnKeymanage(
                    this.bucketName_manage,
                    this.video
                  )
                  .subscribe((res) => {
                    for (let k = 0; k < res.length; k++) {
                      const element = res[k];
                      (this.video_variables =
                        'data:video/mp4;base64,' + res[k].file),
                        (this.video_variable = this.video_variables);

                      if (this.video_variable != undefined) {
                        this.showimage = false;
                        this.showvideo = true;
                        // this._spiner.close();
                      }
                    }
                  });

                if (camp_video_data.statusCode == 400) {
                  this._snackbar.success(camp_video_data.message);
                }
              });
            this.selected_location = this.firstFormGroup.controls['city'].value;
          } else {
            this.firstFormGroup.controls['city'].patchValue('null');

            this.selected_location = null;
            this.location_id_find = null;
            // this._spiner.close();
          }
        } else {
          console.log('city data zero is works');
          // this._spiner.close();
          this.showimage = true;
          this.showvideo = false;
          this.city_1 = [];

          if (res.statusCode == 400) {
            this._snackbar.success(res.message);
          }
        }
        selectedVal.shortName = [];
      });
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  getNearestlocation(data1: string) {
    this.co = data1;
    this.camp_id_select = this.co.camp_id;

    this.co_code = this.co.camp_country_code;
    let aaa: any;
    this._spiner.open();
    this.api_services
      .camp_video_guidelines(this.camp_id_select)
      .subscribe((camp_video_data) => {
        this.video =
          camp_video_data.data[0].camp_showcase_video_cloud_file_storage_id;

        this._cephService
          .getFileMultipleFilesBasedOnKeymanage(
            this.bucketName_manage,
            this.video
          )
          .subscribe((res) => {
            for (let k = 0; k < res.length; k++) {
              const element = res[k];
              (this.video_variables = 'data:video/mp4;base64,' + res[k].file),
                (this.video_variable = this.video_variables);

              if (this.video_variable != undefined) {
                this.showimage = false;
                this.showvideo = true;
                this._spiner.close();
              }
            }
          });

        if (camp_video_data.statusCode == 400) {
          this._snackbar.success(camp_video_data.message);
        }
      });

    this.api_services
      .createTable(this.country_code, this.customer_id, this.camp_id_select)
      .subscribe((res) => {
        console.log(res, 'Table created');
      });
  }

  getval(selectedVal: any) {
    let val = selectedVal.name;
    this.firstFormGroup.controls['country'].setValue(val);
    this._spiner.open();
    this.api_services
      .NearestCampSitetr(selectedVal.shortName)
      .subscribe((res) => {
        this.city_1 = res.data;

        if (this.city_1 != undefined) {
          this._spiner.close();
        }
        if (res.statusCode == 400) {
          this._snackbar.success(res.message);
        }
      });
  }

  onAddressFormSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.formValues = value;
  }
  changeActivity(e: any) {
    this.currentactivity = e.activity_name;
  }
  //* --------------------------  Public methods  --------------------------*//
  checkcountry() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
  }
  //* --------------------------  Public methods  --------------------------*//
  //* ------------------------------ Helper Function -----------------------*//
  openWOWwasteVideo() {
    const dialogRef = this.dialog.open(WowWasteVideoComponent, {
      disableClose: true,
      height: 'auto',
      width: '560px',
      minWidth: '250px',
      data: this.camp_id_select,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
      }
    });
  }

  //! -------------------------------  End  --------------------------------!//
}
