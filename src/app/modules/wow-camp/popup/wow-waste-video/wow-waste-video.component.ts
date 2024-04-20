  import {
    Component,
    ElementRef,
    Inject,
    OnInit,
    ViewChild,
  } from "@angular/core";
  import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
  import { JwtHelperService } from "@auth0/angular-jwt";
  import { TokenService } from "src/app/shared/services/api/token.service";
  import { CustomSpinnerService } from "src/app/shared/services/custom-spinner/custom-spinner.service";
  import { IframeService } from "src/app/shared/services/iframe/iframe.service";
  import { environment } from "src/environments/environment";
  
  @Component({
    selector: 'app-wow-waste-video',
    templateUrl: './wow-waste-video.component.html',
    styleUrls: ['./wow-waste-video.component.scss']
  })
  export class WowWasteVideoComponent implements OnInit {
    //* --------------------------  Start  -----------------------------------*//
  
    //* -----------------------  Decorated Methods  --------------------------*//
    @ViewChild("message") message!: ElementRef;
    @ViewChild("content") content: ElementRef;
    @ViewChild("app_frame", { static: false }) appframe: ElementRef;
  
    //* -----------------------  Variable Declaration  -----------------------*//
  
    iframeSource: string;
    jwt_token: any;
  
    //* ---------------------------  Constructor  ----------------------------*//
    constructor(
      private jwtService: JwtHelperService,
      private _iframeService: IframeService,
      public _dialogRef: MatDialogRef<WowWasteVideoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _customSpinnerService: CustomSpinnerService,
      private _tokenService: TokenService
    ) {}
    //* -------------------------  Lifecycle Hooks  --------------------------*//
    async ngOnInit(): Promise<void> {
      this.iframeSource = environment.wow_waste_guidelines_popup
      this.jwt_token = sessionStorage.getItem("access_token");
    }
    ngAfterViewInit(): void {
      this.iframeLoaded();
    }
  
    //* ----------------------------  APIs Methods  --------------------------*//
  
    //* --------------------------  Public methods  --------------------------*//
  
    iframeLoaded() {
      let iframe: HTMLIFrameElement = this.appframe
        .nativeElement as HTMLIFrameElement;
      iframe.src = String(this.iframeSource).toString();
      this._customSpinnerService.open();
      let is_dark = sessionStorage.getItem("dark") == "true" ? true : false;
  
      // Send a message to the child iframe
      iframe.addEventListener("load", (e) => {
        let body = {
          access_token: this.jwt_token,
          dark: is_dark,
          googleTranslate: sessionStorage.getItem("googleTranslate"),
        };
  
        this.sendMessage(body, String(this.iframeSource).toString());
        this._customSpinnerService.close();
      });
  
      // Receive a message child to parent iframe
      window.addEventListener("message", (e) => {
        if (e.origin == this.iframeSource) {
          if (e.data) {
            // this._iframeService.getIframeMessages(e.data);
          }
        }
      });
    }
    sendMessage(body: any, targetOrigin: string) {
      // Make sure you are sending a string, and to stringify JSON
      let iframeEl = this.appframe.nativeElement as HTMLIFrameElement;
      iframeEl.contentWindow?.postMessage(JSON.stringify(body), targetOrigin);
      // iframeEl.contentWindow.postMessage(body, '*');
    }
  
    close() {
      this._dialogRef.close({ event: "close", data: true });
    }
  
    //* ------------------------------ Helper Function -----------------------*//
  
    //! -------------------------------  End  --------------------------------!//
  }
  
