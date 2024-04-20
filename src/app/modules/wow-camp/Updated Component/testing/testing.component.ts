import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { JwtAuthService } from 'src/app/shared/services/api/jwtauthservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent implements OnInit {
  getAdjustedFontSize() {
    throw new Error('Method not implemented.');
  }
  @ViewChild('scandata', { static: false }) scandata: ElementRef<HTMLElement>;
  @ViewChild('content') content: ElementRef;
  constructor(private authService: JwtAuthService) {}
  country_code: any;
  customer_id: any;
  user_id_login: any;
  user_registration_login_approval_status: any = 3;
  customer_sub_domain_name: any;
  customer_logo_data: any;
  cardUrl:any='1'
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
  }

  pdfDownload() {
  
    // Preload the image
    const img = new Image();
    img.src =
      'https://cephapi.getwow.biz/api/storage/' +
      this.country_code +
      '-' +
      this.customer_id +
      '/' +
      this.customer_sub_domain_name +
      '-icon-128x128.png';
  
    // Wait for the image to load
    img.onload = () => {
      // Once the image is loaded, proceed with pdf generation
      const DATA = this.content.nativeElement;
  
      // Increase PDF width
      const pdfWidth = DATA.offsetWidth + 10; // Adjust the value as needed
  
      const doc = new jsPDF({
        orientation: 'portrait', // or 'landscape'
        unit: 'pt',
        format: [pdfWidth, 595], // Adjust the height (595 is A4 height)
      });
      
  
      // Define the position and dimensions of the image
      const imgX = 20; // Adjust X position as needed
      const imgY = 20; // Adjust Y position as needed
      const imgWidth = 60; // Adjust image width as needed
      const imgHeight = 60; // Adjust image height as needed
  
      // Add the image to PDF
      doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
  
      // Add the rest of the content
      doc.html(DATA, {
        callback: (doc) => {
          doc.save(
            `${this.country_code}_${this.customer_id}_user.pdf`
          );
        },
      });
    };
  }
}
