import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import * as L from 'leaflet';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as Leaflet from 'leaflet';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { icon, Marker } from 'leaflet';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { TokenService } from 'src/app/shared/services/api/token.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { CKEditorComponent } from 'ng2-ckeditor';

import { map, startWith } from 'rxjs';
// @ts-ignore
import * as countrycitystatejson from 'countrycitystatejson';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';

@Component({
  selector: 'app-travel-direction-updated',
  templateUrl: './travel-direction-updated.component.html',
  styleUrls: ['./travel-direction-updated.component.scss'],
})
export class TravelDirectionUpdatedComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  firstFormGroup = this._formBuilder.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    cdk_editor: new FormControl(),
  });

  countries: any[] = [];
  CountryfilteredOptions!: Observable<Country[]>;
  get country() {
    return this.firstFormGroup.get('country');
  }
  get city() {
    return this.firstFormGroup.get('city');
  }
  //* -----------------------  Variable Declaration  -----------------------*//
  filteredCountries: any;
  formValues: any;
  country_id: any;
  city_1: any = ([] = []);
  changecountryid: any;
  location: any;
  locationName: any;
  dataa: any;
  travel_data: any;
  currentactivity: any;
  map_location_x: any;
  map_location_y: any;
  data_json: any;
  popup: any;
  video: any;
  allValue: any;
  place: any;
  geo_data: any;
  // popup: any;
  getfence_data: any;
  video_camp_id: any;
  travel_Datas: any;
  marker: any;
  co_camp_id: any;
  show_Data: boolean = false;
  country_code: any = 'in';
  customer_id: any;
  user_id_login: any;
  bucketName_manage: any = 'getwow-education';
  @ViewChild('myckeditor') myckeditor!: CKEditorComponent;
  ckeConfig!: any;
  readonlydata: boolean = true;
  selected_location: any;
  camp_id_select: any;
  location_id_find: any;

  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    private _formBuilder: FormBuilder,
    private service: CountryStateCityService,
    public data_sharing: DataSharingService,
    private api_services: ApiService,
    private _snackbar: SnackBarService,
    private _spiner: CustomSpinnerService,
    private _headerTitle: HeaderTitleService,
    public _tokenService: TokenService,
    private authService: JwtAuthService,
    private cdr: ChangeDetectorRef
  ) {}
  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    this.data_sharing.update_showTop_data(false);

    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;

    this._headerTitle.setTitle('Travel Directions - Information');

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
        },
      ],
      removeButtons:
        'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,Outdent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Unlink,Anchor,Flash,orizontalRule,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About',
    };

    this.api_services.NearestCampSitetr(this.country_code).subscribe((data) => {
      // this.city_1 = data.data[0];

      // this.disable_location = false;
      this.selected_location = this.firstFormGroup.controls['city'].value;

      this.allValue = data.data[0];

      this.co_camp_id = this.allValue.camp_id;
      // aaa = this.co_camp_id;
      this.getfence_data = this.allValue.camp_geofence_data;
      this.video_camp_id = this.allValue.camp_id;
      this.popup = this.allValue.camp_site_name;

      this.api_services
        .datajsontr(data.data[0].camp_id)
        .subscribe((getdata_1) => {
          this.travel_Datas = getdata_1.data[0].edu_travel_arrangements_info;
          this.firstFormGroup.controls['cdk_editor'].patchValue(
            this.travel_Datas
          );
        });

      this.locationName = data.data[0];
      this.place = this.locationName.camp_site_name;

      this.api_services
        .getNearestlocationtr(data.data[0].camp_id)
        .subscribe((d) => {
          var coordinates = d.data[0].camp_geofence_data;

          this.firstFormGroup.controls['city'].patchValue(data.data[0].camp_id);
          this.location_id_find = data.data[0].camp_id;
          this.camp_id_select = data.data[0].camp_id;

          if (coordinates != null) {
            this.topLeft = coordinates[0][0];
            this.bottomLeft = coordinates[0][1];
            this.topRight = coordinates[0][2];
            this.bottomRight = coordinates[0][3];
            this.sameTopLeft = coordinates[0][4];
          }
          this.geo_data = data.data[0];
          this.location = data.data[0];
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
          //Map to data from api
        });
    });


    this.api_services.NearestCampSitetr(this.country_code).subscribe((res) => {
      this.city_1 = res.data;

      if (this.city_1[0].camp_id != null) {
        this.firstFormGroup.controls['city'].patchValue(this.city_1[0].camp_id);
        this.location_id_find = this.city_1[0].camp_id;
        this.camp_id_select = this.city_1[0].camp_id;

        // this.disable_location = false;
        this.selected_location = this.firstFormGroup.controls['city'].value;

        


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

  getCountryCode(e: any) {}
  //* ----------------------------  APIs Methods  --------------------------*//
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
  co: any;
  co_code: any;
  getNearestlocation(data1: string) {
    this.co = data1;
    this.co_code = this.co.camp_country_code;
    let aaa: any;
    // this._spiner.open();
    this.api_services.NearestCampSitetr(this.co_code).subscribe((data) => {
      this.allValue = data1;

      this.co_camp_id = this.allValue.camp_id;
      aaa = this.co_camp_id;
      this.getfence_data = this.allValue.camp_geofence_data;
      this.video_camp_id = this.allValue.camp_id;
      this.popup = this.allValue.camp_site_name;

      this.api_services
        .datajsontr(this.video_camp_id)
        .subscribe((getdata_1) => {
          if (getdata_1) {
          }
          this.travel_Datas = getdata_1.data[0].edu_travel_arrangements_info;
          this.firstFormGroup.controls['cdk_editor'].patchValue(
            this.travel_Datas
          );
        });

      this.locationName = data1;
      this.place = this.locationName.camp_site_name;

      this.api_services.getNearestlocationtr(aaa).subscribe((d) => {
        var coordinates = d.data[0].camp_geofence_data;
        if (coordinates != null) {
          this.topLeft = coordinates[0][0];
          this.bottomLeft = coordinates[0][1];
          this.topRight = coordinates[0][2];
          this.bottomRight = coordinates[0][3];
          this.sameTopLeft = coordinates[0][4];
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
        //Map to data from api
      });
    });
  }

  getval(selectedVal: any) {
    this.city_1 = [];

    this.firstFormGroup.controls['cdk_editor'].patchValue(null);

    this.api_services
      .NearestCampSitetr(selectedVal.shortName)
      .subscribe((res) => {
        this.city_1 = res.data;

        if (this.city_1 != undefined) {
        }
        if (res.statusCode == 400) {
          this._snackbar.success(res.message);
        }
      });
  }
  camp_site_name: any;

  getCountryData(data: any) {
    this.city_1 = [];
    this.country_id = data;
    this.api_services.NearestCampSitetr(data).subscribe((res) => {
      this.city_1 = res.data;
      this.city_1.filter((res: any) => {
        this.camp_site_name = res.camp_site_name;
      });
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

  //* ------------------------------ Helper Function -----------------------*//
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
    center: { lat: 77.82766765849009, lng: 12.735083990120279 },
  };

  initialMarkers: any[] = [];

  initMarkers() {
    for (let index = 0; index < this.initialMarkers.length; index++) {
      const data = this.initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`${this.popup}`);
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

  //map Ends here

  //! -------------------------------  End  --------------------------------!//
}
