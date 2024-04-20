import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements OnInit {
  constructor(private _iframeService: IframeService) {}

  @ViewChild('app_frame', { static: false }) appframe: ElementRef;

  @Input() iframeSource: string;

  ngOnInit() {
    this._iframeService.sendIframeEmit.subscribe((res) => {
      let body = {
        access_token: localStorage.getItem('access_token'),
        dark: res,
      };
      this.sendMessage(body, this.iframeSource);
    });

    this._iframeService.getIframeEmit.subscribe((res: MessageEvent) => {
      console.warn('Parent Component', res);
    });
  }

  ngAfterViewInit(): void {
    let iframe: HTMLIFrameElement = this.appframe
      .nativeElement as HTMLIFrameElement;
    iframe.src = String(this.iframeSource).toString();

    // Send a message to the child iframe
    window.addEventListener('load', (e) => {
      let body = {
        access_token: localStorage.getItem('access_token'),
        dark: localStorage.getItem('dark'),
      };
      this.sendMessage(body, this.iframeSource);
    });

    // Receive a message child to parent iframe
    window.addEventListener('message', (e) => {
      if (e.origin == this.iframeSource) {
        this._iframeService.getIframeMessages(e.data);
      }
    });
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    let iframeEl = this.appframe.nativeElement as HTMLIFrameElement;
    iframeEl.contentWindow.postMessage(JSON.stringify(body), targetOrigin);
    // iframeEl.contentWindow.postMessage(body, '*');
  }
}
