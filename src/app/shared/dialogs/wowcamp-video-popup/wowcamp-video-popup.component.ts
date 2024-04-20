import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CephService } from 'src/app/shared/services/ceph/cehp.service';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { VideoPlayerComponent } from 'src/app/modules/wow-camp/video-player/video-player.component';

@Component({
  selector: 'app-wowcamp-video-popup',
  templateUrl: './wowcamp-video-popup.component.html',
  styleUrls: ['./wowcamp-video-popup.component.scss'],
})
export class WowcampVideoPopupComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//

  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('videoPlayer') videoPlayer: VideoPlayerComponent;
  //* -----------------------  Variable Declaration  -----------------------*//
  video: any;
  country_code: any;
  customer_id: any;
  user_id_login: any;
  camp_id_select: any;
  bucketName_manage: any = 'getwow-education';
  video_variables: any;
  video_variable: any;
  showvideo: boolean = false;
  showimage: boolean = true;
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public _dialogRef: MatDialogRef<WowcampVideoPopupComponent>,
    private _spiner: CustomSpinnerService,
    private api_services: ApiService,
    private _cephService: CephService,
    private authService: JwtAuthService,
    private _snackbar: SnackBarService,
    public MatDialogRef: MatDialogRef<WowcampVideoPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public guidelinesData: any
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    let one: any = localStorage.getItem('access_token');
    let token: any = this.authService.decodeJwtToken(one);
    this.country_code = token.user.country_code;
    this.customer_id = token.user.customer_id;
    this.user_id_login = token.user.user_id;

  

    // <!--VideoData-->
    this._spiner.open();
    this.api_services
      .camp_video_guidelines(this.guidelinesData)
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
  }

  //* ----------------------------  APIs Methods  --------------------------*//

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  onNoClick() {
    this._dialogRef.close({ event: 'close' });
  }
  //! -------------------------------  End  --------------------------------!//
}
