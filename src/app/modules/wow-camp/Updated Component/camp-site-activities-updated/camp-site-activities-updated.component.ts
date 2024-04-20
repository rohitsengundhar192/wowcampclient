import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscriber, map, startWith } from 'rxjs';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { VideoPlayerComponent } from '../../video-player/video-player.component';
import * as L from 'leaflet';
import * as Leaflet from 'leaflet';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { icon, Marker } from 'leaflet';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { CephService } from 'src/app/shared/services/ceph/cehp.service';
import { CKEditorComponent } from 'ng2-ckeditor';
// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';
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
  selector: 'app-camp-site-activities-updated',
  templateUrl: './camp-site-activities-updated.component.html',
  styleUrls: ['./camp-site-activities-updated.component.scss'],
})
export class CampSiteActivitiesUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  firstFormGroup = this._formBuilder.group({
    city: ['', Validators.required],
    activity1: ['', Validators.required],
    country: ['', Validators.required],
    cdk_editor: new FormControl(),
  });

  get city() {
    return this.firstFormGroup.get('city');
  }
  get activity1() {
    return this.firstFormGroup.get('activity');
  }
  get country() {
    return this.firstFormGroup.get('activity');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  [x: string]: any;
  videoTotalDuration: number = 0;
  playCurrentTime: number = 0;
  pickTimeStamp: number = 0;
  pickTimeStampTitle: string = null;
  pickTimeStampDescription: string = null;
  posterSource: string = '';
  changeCurrentTimeStamp: number;
  countries: any[];
  filteredCountries: any;
  formValues: any;
  city_1: any = ([] = []);
  location: any = null;
  locationName: any;
  activity_names: any;
  actiName: any;
  currentactivity: any;
  map_location_x: any;
  country_code: any;
  customer_id: any;
  map_location_y: any;
  dataa: any;
  data2: any;
  changecountryid: any;
  timeStampDetails: TimeLine[] = [];
  marker: any;
  video: any;
  allValue: any;
  place: any;
  geo_data: any;
  popup: any;
  getfence_data: any;
  video_camp_id: any;
  camp_id: any;
  activityNamevideoid: any;
  co_camp_id: any;
  acvideo: any;
  acname: any;
  acdesc: any[] = [];
  pusharrary: any = [];
  data_activity: any;
  camp_site_name: any;
  user_id_login: any;
  readonlydata: boolean = true;
  selected_location: any;
  alocation_id_find: any;
  location_id_find: any;
  video_variables: any;
  country_id: any;
  camp_id_select: any;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _formBuilder: FormBuilder,
    private service: CountryStateCityService,
    public data_sharing: DataSharingService,
    public api_service: ApiService,
    private _snackbar: SnackBarService,
    private _spiner: CustomSpinnerService,
    private _headerTitle: HeaderTitleService,
    public _tokenService: TokenService,
    private authService: JwtAuthService,
    private _cephService: CephService,
    private cdr: ChangeDetectorRef
  ) {
    this.filteredCountries = this.service.getCountries();
  }
  CountryfilteredOptions: any;
  openalldatabydefaultapi: any;
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;
    this.data_sharing.update_showTop_data(false);
    // this.data_sharing.update_show_side(true);
    this._headerTitle.setTitle('Camp Sites and Activities');

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

    this.api_service.NearestCampSitetr(this.country_code).subscribe((res) => {
      this.city_1 = res.data;
      if (this.city_1[0].camp_id != null) {
        this.firstFormGroup.controls['city'].patchValue(this.city_1[0].camp_id);
        this.location_id_find = this.city_1[0].camp_id;
        this.camp_id_select = this.city_1[0].camp_id;
        this.openalldatabydefaultapi = this.city_1[0];

        // this.disable_location = false;
        this.selected_location = this.firstFormGroup.controls['city'].value;
        this.api_service
          .NearestCampSite(this.openalldatabydefaultapi.camp_country_code)
          .subscribe((data) => {
            this.change(this.openalldatabydefaultapi);
            this.allValue = this.openalldatabydefaultapi;

            this.camp_id = this.allValue.camp_id;
            this.getfence_data = this.allValue.camp_geofence_data;
            var coordinates = this.getfence_data;
            this.topLeft = coordinates[0][0];
            this.bottomLeft = coordinates[0][1];
            this.topRight = coordinates[0][2];
            this.bottomRight = coordinates[0][3];
            this.sameTopLeft = coordinates[0][4];
            this.video_camp_id = this.allValue.camp_id;

            this.api_service
              .camp_video(this.video_camp_id)
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
                      this.imagedata.push({
                        images: 'data:*;base64,' + res[k].file,
                        file_name: res[k].name,
                      });
                    }
                  });

                if (camp_video_data.statusCode == 400) {
                  this._snackbar.success(camp_video_data.message);
                }
              });
            this.activityName(this.allValue.camp_id);
            this.locationName = this.openalldatabydefaultapi;
            this.place = this.locationName.camp_site_name;
            this.popup = this.locationName.camp_site_name;

            this.api_service.getNearestlocation(this.camp_id).subscribe((d) => {
              if (d.statusCode == 400) {
                this._snackbar.success(d.message);
              }
              this.geo_data = this.openalldatabydefaultapi;
              this.location = this.openalldatabydefaultapi;
              this.map_location_x = this.location?.camp_gps_coordinates?.x;
              this.map_location_y = this.location?.camp_gps_coordinates?.y;
              this.let_data = this.map_location_x;
              this.lng_data = this.map_location_y;

              this.initialMarkers = [
                {
                  position: { lat: this.let_data, lng: this.lng_data },
                  draggable: false,
                },
              ];
              this.initMarkers();
              this.map.flyTo([this.let_data, this.lng_data], 16);
              this.marker = L.marker([
                this.map_location_x,
                this.map_location_y,
              ]);
              this.marker.addTo(this.map).bindPopup(`<b>${this.popup}</b>`);
              this.map.flyTo([this.map_location_x, this.map_location_y], 16);
            });

            this.api_service
              .NearestCampSite(this.openalldatabydefaultapi)
              .subscribe((data) => {
                this.api_service.activityName(this.camp_id).subscribe((res) => {
                  this.data_activity = res.data;
                });
              });
          });

        this.api_service
          .NearestCampSite(this.country_code)
          .subscribe((data) => {
            this.api_service
              .activityName(this.openalldatabydefaultapi.camp_id)
              .subscribe((res) => {
                this.data_activity = res.data;
                this.firstFormGroup.controls['activity1'].patchValue(
                  this.data_activity[0].activity_id
                );

                if (this.data_activity != undefined) {
                  this.acname = this.data_activity[0].activity_name;
                  this.api_service
                    .activityvideo(
                      this.openalldatabydefaultapi.camp_id,
                      this.data_activity[0].activity_id
                    )
                    .subscribe((res) => {
                      this.activityvideoid = res.data[0].activity_video;
                      // this._spiner.open();

                      if (this.activityvideoid != undefined) {
                        this._cephService
                          .getFileMultipleFilesBasedOnKeymanage(
                            this.bucketName_manage,
                            this.activityvideoid
                          )
                          .subscribe((res) => {
                            for (let k = 0; k < res.length; k++) {
                              const element = res[k];
                              this.imagedataactivity.push({
                                images: 'data:*;base64,' + res[k].file,
                                file_name: res[k].name,
                              });
                            }
                          });

                        if (res.statusCode == 400) {
                          this._snackbar.success(res.message);
                        }

                        this.acvideo = res.data[0].activity_video;
                        this.acdesc = res.data[0].activity_description;

                        for (
                          let i = 0;
                          i < res.data[0].activity_description.length;
                          i++
                        ) {
                          let element = res.data[0].activity_description[i];
                          this.timeStampDetails = element.description;
                          this.firstFormGroup.controls['cdk_editor'].patchValue(
                            this.timeStampDetails
                          );
                        }
                      }
                    });
                }
              });
          });
      } else {
        this.firstFormGroup.controls['city'].patchValue('null');

        this.selected_location = null;
        this.location_id_find = null;
      }

      if (this.city_1 != undefined) {
        // this._spiner.close();
      }
      if (res.statusCode == 400) {
        this._snackbar.success(res.message);
      }
    });
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
  // resetAndSelectCountry(selectedOption: any) {
  //   // Reset the country form control before selecting a new country
  //   // this.firstFormGroup.controls['country'].setValue(null);

  //   // Call the getCountryCode method with the selected country
  //   this.getCountryData(selectedOption);
  // }
  //* ----------------------------  APIs Methods  --------------------------*//
  lastSelectedCountry: any;
  getCountryData(data: any) {
    this.imagedataactivity = [];
    this.imagedata = [];
    this.firstFormGroup.controls['cdk_editor'].patchValue(' ');
    this.place = [];
    this.lastSelectedCountry = data;

    this.country_id = data.shortName;

    // let val = selectedVal.name;
    // this.firstFormGroup.controls['country'].setValue(val);
    // this._spiner.open();
    this.api_service.NearestCampSite(data.shortName).subscribe((res) => {
      if (res) {
        this.city_1 = res.data;
        this.city_1.filter((res: any) => {
          this.camp_site_name = res.camp_site_name;
        });
      }

      if (res.statusCode == 400) {
        this._snackbar.success(res.message);
      }
    });
  }
  getval(selectedVal: any) {
    let val = selectedVal.name;
    this.firstFormGroup.controls['country'].setValue(val);
    // this._spiner.open();

    if (selectedVal.shortName != undefined) {
      this.api_service
        .NearestCampSite(selectedVal.shortName)
        .subscribe((res) => {
          this.city_1 = res.data;

          if (this.city_1 != undefined) {
            // this._spiner.close();
          }
          if (res.statusCode == 400) {
            this._snackbar.success(res.message);
          }
        });
    }
  }
  imagedata: any[] = [];
  bucketName_manage: any = 'getwow-education';
  getNearestlocation(data1: any) {
    this.imagedataactivity = [];

    this.imagedata = [];
    this.api_service
      .NearestCampSite(data1.camp_country_code)
      .subscribe((data) => {
        this.change(data1);
        this.allValue = data1;

        this.camp_id = this.allValue.camp_id;
        this.getfence_data = this.allValue.camp_geofence_data;

        var coordinates = data.data[0].camp_geofence_data;

        if (coordinates != null) {
          this.topLeft = coordinates[0][0];
          this.bottomLeft = coordinates[0][1];
          this.topRight = coordinates[0][2];
          this.bottomRight = coordinates[0][3];
          this.sameTopLeft = coordinates[0][4];
        }
        this.video_camp_id = this.allValue.camp_id;

        this.api_service
          .camp_video(this.video_camp_id)
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
                  this.imagedata.push({
                    images: 'data:*;base64,' + res[k].file,
                    file_name: res[k].name,
                  });
                }
              });

            if (camp_video_data.statusCode == 400) {
              this._snackbar.success(camp_video_data.message);
            }
          });
        this.activityName(this.allValue.camp_id);
        this.locationName = data1;
        this.place = this.locationName.camp_site_name;
        this.popup = this.locationName.camp_site_name;

        this.api_service.getNearestlocation(this.camp_id).subscribe((d) => {
          if (d.statusCode == 400) {
            this._snackbar.success(d.message);
          }
          this.geo_data = data1;
          this.location = data1;
          this.map_location_x = this.location?.camp_gps_coordinates?.x;
          this.map_location_y = this.location?.camp_gps_coordinates?.y;
          this.let_data = this.map_location_x;
          this.lng_data = this.map_location_y;

          this.initialMarkers = [
            {
              position: { lat: this.let_data, lng: this.lng_data },
              draggable: false,
            },
          ];
          this.initMarkers();
          this.map.flyTo([this.let_data, this.lng_data], 16);
          this.marker = L.marker([this.map_location_x, this.map_location_y]);
          this.marker.addTo(this.map).bindPopup(`<b>${this.popup}</b>`);
          this.map.flyTo([this.map_location_x, this.map_location_y], 16);
        });

        //activity
        this.api_service
          .NearestCampSite(data1.camp_country_code)
          .subscribe((data) => {
            this.api_service.activityName(data1.camp_id).subscribe((res) => {
              this.data_activity = res.data;
              this.firstFormGroup.controls['activity1'].patchValue(
                this.data_activity[0].activity_id
              );

              if (this.data_activity != undefined) {
                this.acname = this.data_activity[0].activity_name;
                this.api_service
                  .activityvideo(
                    data1.camp_id,
                    this.data_activity[0].activity_id
                  )
                  .subscribe((res) => {
                    this.activityvideoid = res.data[0].activity_video;
                    // this._spiner.open();
                    if (this.activityvideoid != undefined) {
                      this._cephService
                        .getFileMultipleFilesBasedOnKeymanage(
                          this.bucketName_manage,
                          this.activityvideoid
                        )
                        .subscribe((res) => {
                          for (let k = 0; k < res.length; k++) {
                            const element = res[k];
                            this.imagedataactivity.push({
                              images: 'data:*;base64,' + res[k].file,
                              file_name: res[k].name,
                            });
                          }
                        });

                      if (res.statusCode == 400) {
                        this._snackbar.success(res.message);
                      }

                      this.acvideo = res.data[0].activity_video;
                      this.acdesc = res.data[0].activity_description;

                      for (
                        let i = 0;
                        i < res.data[0].activity_description.length;
                        i++
                      ) {
                        let element = res.data[0].activity_description[i];
                        this.timeStampDetails = element.description;
                        this.firstFormGroup.controls['cdk_editor'].patchValue(
                          this.timeStampDetails
                        );
                      }
                    }
                  });
              }
            });
          });

        this.api_service.NearestCampSite(data1).subscribe((data) => {
          this.api_service.activityName(this.camp_id).subscribe((res) => {
            this.data_activity = res.data;
          });
        });
      });

    this.api_service
      .createTable(this.country_code, this.customer_id, this.camp_id)
      .subscribe((res) => {});
  }
  activty_name() {
    // this._spiner.open();
    this.api_service.NearestCampSite(this.country_id).subscribe((data) => {
      if (data) {
        // this._spiner.close();
      }
      this.api_service.activityName(this.camp_id).subscribe((res) => {
        this.data_activity = res.data;
      });
    });
  }

  change(data1: any) {
    this.api_service.NearestCampSite(this.country_id).subscribe((data) => {
      this.api_service.activityName(this.camp_id).subscribe((res) => {
        this.data_activity = res.data;
      });
    });
  }

  activityvideoid: any;
  imagedataactivity: any[] = [];
  check: any = 'hi';
  activityvideo(e: any) {
    this.imagedataactivity = [];
    this.activityNamevideoid = e.activity_id;
    this.acname = e.activity_name;
    this.api_service
      .activityvideo(this.camp_id, this.activityNamevideoid)
      .subscribe((res) => {
        this.activityvideoid = res.data[0].activity_video;

        // this._spiner.open();

        if (this.activityvideoid != undefined) {
          this._cephService
            .getFileMultipleFilesBasedOnKeymanage(
              this.bucketName_manage,
              this.activityvideoid
            )
            .subscribe((res) => {
              for (let k = 0; k < res.length; k++) {
                const element = res[k];
                this.imagedataactivity.push({
                  images: 'data:*;base64,' + res[k].file,
                  file_name: res[k].name,
                });
              }
            });

          if (res.statusCode == 400) {
            this._snackbar.success(res.message);
          }

          this.acvideo = res.data[0].activity_video;
          this.acdesc = res.data[0].activity_description;

          for (let i = 0; i < res.data[0].activity_description.length; i++) {
            let element = res.data[0].activity_description[i];
            this.timeStampDetails = element.description;
            this.firstFormGroup.controls['cdk_editor'].patchValue(
              this.timeStampDetails
            );
          }
        }
      });
  }
  @ViewChild('myckeditor') myckeditor!: CKEditorComponent;
  ckeConfig!: any;
  activityName(camp_id: number) {
    // this._spiner.open();
    this.api_service.activityName(camp_id).subscribe((data2) => {
      if (data2.statusCode == 400) {
        this._snackbar.success(data2.message);
      }
      if (data2) {
        // this._spiner.close();
      }
      this.activity_names = data2.data;
    });
  }
  //* --------------------------  Public methods  --------------------------*//
  checkcountry() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
  }

  checkkk() {
    if (this.firstFormGroup.get('country').hasError('required')) {
      this.firstFormGroup.controls['country'].markAsTouched();
    }
    if (this.firstFormGroup.get('city').hasError('required')) {
      this.firstFormGroup.controls['city'].markAsTouched();
    }
  }

  //* ------------------------------ Helper Function -----------------------*//
  onAddressFormSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.formValues = value;
  }

  PlayVideo: any;
  changeActivity(e: any) {
    this.currentactivity = e.activity_name;
    this.PlayVideo = e.activity_showcase_video_file_storage_path;
  }
  //! -------------------------------  End  --------------------------------!//

  // Map start
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
      marker.addTo(this.map).bindPopup(`${this.popup}`);
      this.map.flyTo(data.position);
      this.markers.push(marker);

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
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
      this.map.flyTo([position?.latitude, position?.longitude], 14);

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
      // marker.addTo(this.map);
    });
  }

  setView() {
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
      // marker.addTo(this.map);
    });
  }

  mapClicked($event: any) {}

  markerClicked($event: any, index: number) {}

  markerDragEnd($event: any, index: number) {}

  onPickTimeStamp(video: Event) {
    let e = video.target as HTMLVideoElement;
    this.pickTimeStamp = e.currentTime;
  }

  onTimeStampChangeToPlay(e: any) {
    this.changeCurrentTimeStamp = e;

    setTimeout(() => {
      this.videoPlayer.onTimeStampChangeToPlay();
    }, 0);
  }

  getVideoTotalDuration(e: number) {
    this.videoTotalDuration = e;
  }

  onTimeUpdate(video: Event) {
    let e = video.target as HTMLVideoElement;
    this.playCurrentTime = e.currentTime;
  }

  changeTimeFormat(currentTime: number): string {
    let timestamp = currentTime;
    let hours = Math.floor(timestamp / 60 / 60);
    let minutes = Math.floor(timestamp / 60) - hours * 60;
    let seconds = Math.floor(timestamp % 60);

    let formatted =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');
    return formatted;
  }

  arraySort(_data: any[]) {
    let sortKey = 'time_stamp';
    let value = _data;
    let SortOrder: 'asc' | 'desc' = 'asc';

    let numberArray = [];
    let stringArray = [];

    if (!sortKey) {
      numberArray = value.filter((item) => typeof item === 'number').sort();
      stringArray = value.filter((item) => typeof item === 'string').sort();
    } else {
      numberArray = value
        .filter((item) => typeof item[sortKey] === 'number')
        .sort((a, b) => a[sortKey] - b[sortKey]);
      stringArray = value
        .filter((item) => typeof item[sortKey] === 'string')
        .sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        });
    }

    const sorted = numberArray.concat(stringArray);

    return SortOrder === 'asc' ? sorted : sorted.reverse();
  }
}

interface TimeLine {
  title: string;
  description: string;
  time_stamp?: number;
}
