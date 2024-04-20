import { JwtAuthService } from './jwtauthservice.service';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { has } from 'lodash';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;
  login_id = 1;

  private httpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend,
    private _jwtAuthService: JwtAuthService
  ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);
  }

  getvalues() {
    this.customer_id = localStorage.getItem('customer_id');
    this.country_no = localStorage.getItem('country_no');
  }

  post_form(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  post_address_form(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.address_form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  post_stepper_form(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.stepper_form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  get_auditTrail(
    type: any,
    currentPage: number,
    pageSize: number
  ): Observable<any> {
    return this.http
      .get<any>(
        `${environment.audit_trail}?country_no=${this.country_no}&customer_id=${this.customer_id}&type=${type}&pageno=${currentPage}&per_page=${pageSize}`
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  get_periodic_elements(
    currentPage: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.pagination_table}?pageno=${currentPage}&per_page=${pageSize}`
    );
  }

  post_category(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.add_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  get_category(): Observable<any> {
    return this.http
      .get<any>(
        `${environment.get_categories}?country_no=${this.country_no}&customer_id=${this.customer_id}`
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  update_category(body: any): Observable<any> {
    return this.http.put<any>(
      `${environment.update_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  hide_category(body: any): Observable<any> {
    return this.http.put<any>(
      `${environment.hide_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  assign_category(body: any) {
    return this.http.post<any>(
      `${environment.assign_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  get_users() {
    return this.http
      .get<any>(
        `${environment.get_users}?country_no=${this.country_no}&customer_id=${this.customer_id}`
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  get_assigned_category() {
    return this.http
      .get<any>(
        `${environment.get_assigned_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  get_users_category_id(category_id: string) {
    return this.http
      .get<any>(
        `${environment.get_users_category_id}?country_no=${this.country_no}&customer_id=${this.customer_id}&category_id=${category_id}`
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  update_assigned_category(body: any) {
    return this.http.put<any>(
      `${environment.update_assigned_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  check_user_is_assigned_category(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.check_user_is_assigned_category}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  passingUsersParentToChild(body: any): Observable<any> {
    return this.http.put<any>(
      `${environment.passingUsersParentToChild}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
      body
    );
  }

  // //
  //  postUtcCurrentTimestampBasedOnTimeZoneIanaString(body: any): Observable<any> {
  //   return this.http.get<any>(
  //     `${environment.postUtcCurrentTimestampBasedOnTimeZoneIanaString}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
  //     body
  //   );
  //   console.log(body);
  // }

  postUtcCurrentTimestampBasedOnTimeZoneIanaString(body: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.postUtcCurrentTimestampBasedOnTimeZoneIanaString}`,
        body
      )
      .pipe(
        map((m) => {
          let data = m.data;
          let msg = m.message;
          return [data, msg];
        })
      );
  }

  //Mine Api's
  //camp_sites_and_activities starts

  NearestCampSite(country_code: string): Observable<any> {
    return this.http.get<any>(
      `${environment.NearestCampSite}?country_code_1=${country_code}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getNearestlocation(camp_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.getNearestlocation}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  activityName(camp_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.activityName}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  activityvideo(camp_id: number, activity_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.activityvideo}?camp_id=${camp_id}&activity_id=${activity_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  datajson(camp_id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.datajson}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  ticketdatajson(camp_id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.ticketdatajson}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  camp_video(camp_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.camp_video}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  camp_video_guidelines(camp_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.camp_video_guidelines}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //camp_sites_and_activities end

  //Travel Direction
  NearestCampSitetr(country_code: string): Observable<any> {
    return this.http.get<any>(
      `${environment.NearestCampSitetr}?country_code_1=${country_code}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  getNearestlocationtr(camp_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.getNearestlocation}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  datajsontr(camp_id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.datajson}?camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Activity Completion Certificate

  getcertificate() {
    return this.http.get<any>(
      `  http://localhost:3000/certificate
      `
    );
  }

  parent_child_select(): Observable<any> {
    return this.http.get<any>(
      `${environment.parent_child_select}?`,
      this._jwtAuthService.getJwtToken()
    );
  }

  parent_child_select_new(
    country_code: string,
    customer_id: number,
    user_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.selected_stu}?country_code=${country_code}&Customer_id=${customer_id}&User_id=${user_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  student_data(
    country_code: string,
    customer_id: number,
    stu_data: any
  ): Observable<any> {
    // console.log(stu_data);
    return this.http.get<any>(
      `${environment.student_data}?country_code=${country_code}&customer_id=${customer_id}&student_user_id=${stu_data}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  activityCertificatedata(
    activity_id: number,
    camp_id: number,
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.activityCertificatedata}?activity_id=${activity_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  first_student_data(
    country_code: string,
    customer_id: number,
    stu_id: any
  ): Observable<any> {
    // console.log(stu_data);
    return this.http.get<any>(
      `${environment.first_stu}?country_code=${country_code}&customer_id=${customer_id}&student_id=${stu_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  ClassOneToEightUrl(
    country_code: string,
    customer_id: number,
    user_id: any,
    activity_id: number,
    camp_id: number,
    token: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.ClassOneToEightUrl}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}&activity_id=${activity_id}&camp_id=${camp_id}&token=${token}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  decryptCode(hash: string): Observable<any> {
    return this.http.get<any>(
      `${environment.decryptCode}?hash=${hash}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  institutiondata(customer_id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.institutiondata}?customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //Camp Participation Approval and Wavier Form
  //OverAll Select Category
  selectCategory(country_code: string, customer_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.selectCategory}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  selectCategoryPopup(
    country_code: string,
    customer_id: number,
    user_category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.selectCategorypopup}?country_code=${country_code}&customer_id=${customer_id}&user_category_id=${user_category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  
  selectCategoryPopuphod(
    country_code: string,
    customer_id: number,
    user_category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.selectCategorypopuphod}?country_code=${country_code}&customer_id=${customer_id}&user_category_id=${user_category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  selectCategorynormal(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.selectCategorynormal}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  // 1) Add Participation Button
  datadisplay(
    country_code: string,
    customer_id: number,
    category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.datadisplay}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  data_table_two(
    country_code: string,
    customer_id: number,
    category_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.data_table_two}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  data_table_not_display(
    country_code: string,
    customer_id: number,
    category_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.data_table_not_display}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  addParticipants(
    country_code: string,
    customer_id: number,
    login_id: number,
    data: any
  ): Observable<any> {
    return this.http.post(
      `${environment.addParticipants}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&user_id=${data}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  //3) Add/Edit Authorizer
  authorizerTodisplay(
    country_code: string,
    customer_id: number,
    category_id: string,
    userId: any
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.authorizerTodisplay}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}&userId=${userId}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  addAuthorizer(
    country_code: string,
    customer_id: number,
    login_id: number,
    user_id: number,
    authorizer_id: number
  ): Observable<any> {
    return this.http.put(
      `${environment.addAuthorizer}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&user_id=${user_id}&authorizer_id=${authorizer_id}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  downloadDateTime(
    country_code: string,
    customer_id: number,
    user_id: number,
    waiver_form_download_datetime: any,
    login_id: number
  ): Observable<any> {
    return this.http.put(
      `${environment.downloadDateTime}?country_code=${country_code}&customer_id=${customer_id}&user_id=${user_id}&waiver_form_download_datetime=${waiver_form_download_datetime}&login_id=${login_id}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  ins_data(country_code: string, customer_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.ins_data}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  updateeditindphotovideo(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateuploadform}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  updateeditparticipants(body: any): Observable<any> {
    return this.http.post(
      `${environment.updateeditparticipants}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }
  //BookCampTickets

  NearestCampSiteTickets(country_code: string): Observable<any> {
    return this.http.get<any>(
      `${environment.NearestCampSiteTickets}?country_code=${country_code}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //OverAll Select Category
  selectCategoryTickets(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.selectCategoryTickets}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  data_tableTickets(
    country_code: string,
    customer_id: number,
    category_id: string,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.data_tableTickets}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  gettablebookvolunteer(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.gettablebookvolunteer}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  addparticipantsupdate(
    country_code: string,
    customer_id: number,
    category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.addparticipantsupdate}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  addparticipantsupdateedit(
    country_code: string,
    customer_id: number,
    category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.addparticipantsupdateedit}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  addvolunteerupdate(
    country_code: string,
    customer_id: number,
    category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.addvolunteerupdate}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  addauthorizerupdate(
    country_code: string,
    customer_id: number,
    category_id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.addauthorizerupdate}?country_code=${country_code}&customer_id=${customer_id}&category_id=${category_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  savepartcipants(body: any): Observable<any> {
    return this.http.post<any>(
      `${environment.savepartcipants}`,
      body,
      this._jwtAuthService.getJwtToken()
    );
  }

  deleteuserid(
    country_code: any,
    customer_id: number,
    waiver_form_for_participant_user_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.delete_file}?country_code=${country_code}&customer_id=${customer_id}&waiver_form_for_participant_user_id=${waiver_form_for_participant_user_id}&login_id=${login_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //wowticket
  BookwowTicket(user_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.BookwowTicket}?camp_id=${user_id} `,
      this._jwtAuthService.getJwtToken()
    );
  }

  BookwowTicketUpdate(
    country_code: string,
    customer_id: number,
    login_id: number,
    user_id: number,
    camp_id: number,
    entry_ticket_debit_transaction_id: number
  ): Observable<any> {
    return this.http.post(
      `${environment.BookwowTicketUpdate}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&user_id=${user_id}&camp_id=${camp_id}&entry_ticket_debit_transaction_id=${entry_ticket_debit_transaction_id}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  //getticket
  BookgetTicket(user_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.BookgetTicket}?camp_id=${user_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  BookgetTicketUpdate(
    country_code: string,
    customer_id: number,
    login_id: number,
    user_id: number,
    camp_id: number,
    entry_ticket_debit_transaction_id: number
  ): Observable<any> {
    return this.http.post(
      `${environment.BookgetTicketUpdate}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&user_id=${user_id}&camp_id=${camp_id}&entry_ticket_debit_transaction_id=${entry_ticket_debit_transaction_id}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Volunteer ticket
  BookvolunteerTicket(user_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.BookvolunteerTicket}?camp_id=${user_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  BookvolunteerTicketUpdate(
    country_code: string,
    customer_id: number,
    login_id: number
  ): Observable<any> {
    return this.http.post(
      `${environment.BookvolunteerTicketUpdate}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Review Book Tickets

  reviewcancelticketsdisplay(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.reviewcancelticketsdisplay}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //
  reviewcancelticketsdisplayupdate(
    country_code: string,
    customer_id: number,
    login_id: number,
    user_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.put(
      `${environment.reviewcancelticketsdisplayupdate}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&user_id=${user_id}&camp_id=${camp_id}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  ///schedule camp trip and activities

  nearcampschedule(country_code: string, customer_id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.nearcampschedule}?country_code_1=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  nearcampreschedule(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.nearcampreschedule}?country_code_1=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  activitygroupdisplay(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.activitygroupdisplay}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  activitygroupinsert(
    country_code: string,
    customer_id: number,
    login_id: number,
    user_id: any,
    camp_id: number,
    name: string
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.activitygroupinsert}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&user_id=${user_id}&camp_id=${camp_id}`,
      name,
      this._jwtAuthService.getJwtToken()
    );
  }
  //Delete Activity Group
  selectactivity(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.selectactivity}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  deleteactivitygroupdisplay(
    country_code: string,
    customer_id: number,
    group_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.deleteactivitygroupdisplay}?country_code=${country_code}&customer_id=${customer_id}&group_id=${group_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //
  deleteactivitygroupdupdate(
    country_code: string,
    customer_id: number,
    login_id: number,
    trip_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.put(
      `${environment.deleteactivitygroupdupdate}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&trip_id=${trip_id}&camp_id=${camp_id}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  //
  //Schedule Trip
  sechduleselectactivity(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.sechduleselectactivity}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  schedulegroupdisplay(
    country_code: string,
    customer_id: number,
    group_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.schedulegroupdisplay}?country_code=${country_code}&customer_id=${customer_id}&group_id=${group_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  resechduleselectactivity(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.resechduleselectactivity}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  reschedulegroupdisplay(
    country_code: string,
    customer_id: number,
    group_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.reschedulegroupdisplay}?country_code=${country_code}&customer_id=${customer_id}&group_id=${group_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //calender

  getcalenderdatanew(
    country_code: string,
    customer_id: number,
    Camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getcalenderdatanew}?country_code=${country_code}&customer_id=${customer_id}&Camp_id=${Camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  calenderAvailability(
    country_code: string,
    customer_id: number,
    camp_id: number,
    trip_date: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.calenderAvailability}?country_code=${country_code}&customer_id=${customer_id}&Camp_id=${camp_id}&trip_date=${trip_date}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  schdeuletripUpdate(
    Camp_id: number,
    group_id: number,
    trip_Datetime: string
  ): Observable<any> {
    return this.http.put(
      `${environment.scheduletripupdate}?camp_id=${Camp_id}&group_id=${group_id}&trip_datetime=${trip_Datetime}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  reschdeuletripUpdate(
    country_code: string,
    customer_id: number,
    login_id: number,
    Camp_id: number,
    group_id: number,
    trip_Datetime: string
  ): Observable<any> {
    return this.http.put(
      `${environment.rescheduletripupdate}?country_code=${country_code}&customer_id=${customer_id}&login_id=${login_id}&camp_id=${Camp_id}&group_id=${group_id}&trip_datetime=${trip_Datetime}`,
      null,
      this._jwtAuthService.getJwtToken()
    );
  }

  //Audit Trail
  AuditTrail(
    country_code: string,
    customer_id: number,
    page_no: number,
    page_per: number
  ) {
    return this.http.get<any>(
      `${environment.AuditTrail}?country_code=${country_code}&customer_id=${customer_id}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //Book camp
  AuditTrailbook(
    country_code: string,
    customer_id: number,
    page_no: number,
    page_per: number
  ) {
    return this.http.get<any>(
      `${environment.AuditTrailbook}?country_code=${country_code}&customer_id=${customer_id}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }
  //schdeule
  AuditTrailSchdeule(
    country_code: string,
    customer_id: number,
    page_no: number,
    page_per: number
  ) {
    return this.http.get<any>(
      `${environment.AuditTrailSchdeule}?country_code=${country_code}&customer_id=${customer_id}&page_no=${page_no}&per_page=${page_per}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  createTable(
    country_code: string,
    customer_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.createTable}?country_code=${country_code}&customer_id=${customer_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  //updated schedule Camp

  getactivitygrouptable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getactivitygrouptable}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  getscheduletriptable(
    country_code: string,
    customer_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.getscheduletriptable}?country_code=${country_code}&customer_id=${customer_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }

  sechdeuleTriplistdisplay(
    country_code: string,
    customer_id: number,
    group_id: number,
    camp_id: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.sechdeuleTriplistdisplay}?country_code=${country_code}&customer_id=${customer_id}&group_id=${group_id}&camp_id=${camp_id}`,
      this._jwtAuthService.getJwtToken()
    );
  }
}
