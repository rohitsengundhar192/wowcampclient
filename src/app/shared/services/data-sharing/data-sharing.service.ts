import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  private Audit_trail = new BehaviorSubject<string | any>(undefined);
  audit_trail_data = this.Audit_trail.asObservable();

  updateAuditTrailData(data: string) {
    this.Audit_trail.next(data);
  }

  private layout = new BehaviorSubject<any>(false);
  layout_data = this.layout.asObservable();

  secondary(data: any) {
    this.layout.next(data);
  }
  private Assigned_category = new BehaviorSubject<any>(undefined);
  assigned_category_data = this.Assigned_category.asObservable();

  updateAssignedCategoryData(data: any) {
    this.Assigned_category.next(data);
  }

  //Radio Button selection
  private rad_button = new BehaviorSubject<boolean>(true);
  rad_button_data = this.rad_button.asObservable();

  radioButtonFunction(data: any) {
    this.rad_button.next(data);
  }

  private rad_button_two = new BehaviorSubject<boolean>(true);
  rad_button_data_two = this.rad_button_two.asObservable();

  radioButtonFunctionTwo(data: any) {
    this.rad_button_two.next(data);
  }

  private rad_button_ticket = new BehaviorSubject<boolean>(true);
  rad_button_data_ticket = this.rad_button_ticket.asObservable();

  radioButtonFunctionTicket(data: any) {
    this.rad_button_ticket.next(data);
  }

  private activity_check_box_ticket = new BehaviorSubject<boolean>(true);
  activity_check_data_ticket = this.activity_check_box_ticket.asObservable();

  activitycheckboxFunctionticket(data: any) {
    this.activity_check_box_ticket.next(data);
  }

  private rad_button_overnight = new BehaviorSubject<boolean>(true);
  rad_button_data_overnight = this.rad_button_overnight.asObservable();

  radioButtonFunctionovernight(data: any) {
    this.rad_button_overnight.next(data);
  }

  private rad_button_cancel = new BehaviorSubject<boolean>(true);
  rad_button_data_cancel = this.rad_button_cancel.asObservable();

  radioButtonFunctioncancel(data: any) {
    this.rad_button_cancel.next(data);
  }

  private data_vol = new BehaviorSubject<any>(undefined);
  data_volenteer = this.data_vol.asObservable();

  addVol_1(data: any) {
    this.data_vol.next(data);
  }

  private data_aut = new BehaviorSubject<any>(undefined);
  data_authorizer = this.data_aut.asObservable();

  addAut_1(data: any) {
    this.data_aut.next(data);
  }

  //Volunteer
  private vol_display = new BehaviorSubject<any>(undefined);
  vol_button_data = this.vol_display.asObservable();

  volButtonFunction(data: any) {
    this.vol_display.next(data);
  }

  //Authorizer
  private aut_display = new BehaviorSubject<any>(undefined);
  aut_button_data = this.aut_display.asObservable();

  autButtonFunction(data: any) {
    this.aut_display.next(data);
  }

  //update the table
  private volunteer_table = new Subject<any>();
  volunteer_table_data = this.volunteer_table.asObservable();

  updateVolunteer_table(data: any) {
    this.volunteer_table.next(data);
  }

  private authorizer_table = new Subject<any>();
  authorizer_table_data = this.authorizer_table.asObservable();

  updateAuthorizer_table(data: any) {
    this.authorizer_table.next(data);
  }

  private download_datetime = new Subject<any>();
  download_datetime_data = this.download_datetime.asObservable();

  downloadDateTime(data: any) {
    this.download_datetime.next(data);
  }

  private download_datetime_function = new BehaviorSubject<boolean>(true);
  download_datetime_function_data =
    this.download_datetime_function.asObservable();

  downloadDatetimeFunction(data: any) {
    this.download_datetime_function.next(data);
  }

  private activity_completion_selected_student = new Subject<any>();
  activity_completion_selected_student_data =
    this.activity_completion_selected_student.asObservable();

  updateActivityCompletionSelectedStudent(data: any) {
    this.activity_completion_selected_student.next(data);
  }

  private activity_completion_selected_student_table = new Subject<any>();
  activity_completion_selected_student_data_table =
    this.activity_completion_selected_student_table.asObservable();

  updateActivityCompletionSelectedStudentTable(data: any) {
    this.activity_completion_selected_student_table.next(data);
  }

  private disabled_data = new Subject<any>();
  disabled_data_data = this.disabled_data.asObservable();

  disabledData(data: any) {
    this.disabled_data.next(data);
  }

  private Activity_certificate = new BehaviorSubject<any>(undefined);
  Activity_certificate_data = this.Activity_certificate.asObservable();

  ActivityCertificateValues(data: any) {
    this.Activity_certificate.next(data);
  }

  private Activity_certificate_material = new BehaviorSubject<any>(undefined);
  Activity_certificate_data_material =
    this.Activity_certificate_material.asObservable();

  ActivityCertificateValuesMaterial(data: any) {
    this.Activity_certificate_material.next(data);
  }

  private Activity_certificate_top_stu = new BehaviorSubject<any>(undefined);
  Activity_certificate_top_stu_data =
    this.Activity_certificate_top_stu.asObservable();

  ActivityCertificateTopStu(data: any) {
    this.Activity_certificate_top_stu.next(data);
  }
  private radio_button = new BehaviorSubject<any>(undefined);
  radio_button_data = this.radio_button.asObservable();

  radioButton(data: any) {
    this.radio_button.next(data);
  }

  //show header
  private showTop = new BehaviorSubject<any>(false);
  showTop_data = this.showTop.asObservable();

  update_showTop_data(data: any) {
    this.showTop.next(data);
  }

  //show header
  private showSide = new BehaviorSubject<any>(false);
  showSide_data = this.showSide.asObservable();

  update_show_side(data: any) {
    this.showSide.next(data);
  }

  private share_datato_pdf = new BehaviorSubject<any>(false);
  share_datato_pdf_data = this.share_datato_pdf.asObservable();

  shareDatatoPdf(data: any) {
    this.share_datato_pdf.next(data);
  }

  private share_datato_pdf_status = new BehaviorSubject<any>(false);
  share_datato_pdf_status_data = this.share_datato_pdf_status.asObservable();

  shareDatatoPdfShare(data: any) {
    this.share_datato_pdf_status.next(data);
  }

  private pdfDownloadSubject = new Subject<void>();

  pdfDownloadRequested$ = this.pdfDownloadSubject.asObservable();

  shareDatatoPdfSharedoler(data: any) {
    this.pdfDownloadSubject.next(data);
  }

  //DataShare for new Download Test component
  private download_test_user_id = new BehaviorSubject<any>(undefined);
  download_test_user_id_data = this.download_test_user_id.asObservable();

  downloadtestUserId(data: any) {
    this.download_test_user_id.next(data);
  }

  private datasouce_table_change_id = new BehaviorSubject<any>(undefined);
  datasouce_table_change_data = this.datasouce_table_change_id.asObservable();

  datasouceTableChangeFunction(data: any) {
    this.datasouce_table_change_id.next(data);
  }

  private datasouce_table_change_id_id = new BehaviorSubject<any>(undefined);
  datasouce_table_change_data_id_data =
    this.datasouce_table_change_id_id.asObservable();

  datasouceTableChangeFunctionID(data: any) {
    this.datasouce_table_change_id_id.next(data);
  }

  private share_coordinated_to_map = new BehaviorSubject<any>(undefined);
  share_coordinated_to_map_data = this.share_coordinated_to_map.asObservable();

  shareCoordinatedtoMap(data: any) {
    this.share_coordinated_to_map.next(data);
  }

  //data share for share wow amount from normal to santhosan app
  private share_wow_wmount_id = new BehaviorSubject<any>(undefined);
  share_wow_wmount_id_data = this.share_wow_wmount_id.asObservable();

  shareWowAmountId(data: any) {
    this.share_wow_wmount_id.next(data);
  }

  //data share for share wow amount to normal from santhosan app
  private share_wow_wmount_get_id = new BehaviorSubject<any>(undefined);
  share_wow_wmount_get_id_data = this.share_wow_wmount_get_id.asObservable();

  shareWowAmountgetId(data: any) {
    this.share_wow_wmount_get_id.next(data);
  }

  //data share for share wow amount to normal from santhosan app
  private share_get_wmount_get_id = new BehaviorSubject<any>(undefined);
  share_get_wmount_get_id_data = this.share_get_wmount_get_id.asObservable();

  shareGetAmountgetId(data: any) {
    this.share_get_wmount_get_id.next(data);
  }

  //data share for set wallet type
  private set_wallet_type = new BehaviorSubject<any>(undefined);
  set_wallet_type_Data = this.set_wallet_type.asObservable();

  setWalletType(data: any) {
    this.set_wallet_type.next(data);
  }
  //data share for share wow amount to normal from santhosan app
  private share_user_get_id = new BehaviorSubject<any>(undefined);
  share_user_get_id_data = this.share_user_get_id.asObservable();

  shareUserGetId(data: any) {
    this.share_user_get_id.next(data);
  }

  //data share for share wow amount to normal from santhosan app
  private share_ticket_price_id = new BehaviorSubject<any>(undefined);
  share_ticket_price_id_Data = this.share_ticket_price_id.asObservable();

  shareTicketPriceId(data: any) {
    this.share_ticket_price_id.next(data);
  }

  //data share for share wow amount to normal from santhosan app
  private share_camp_id = new BehaviorSubject<any>(undefined);
  share_camp_id_data = this.share_camp_id.asObservable();

  shareCampId(data: any) {
    this.share_camp_id.next(data);
  }

  private share_category_new = new BehaviorSubject<any>(undefined);
  share_category_new_data = this.share_category_new.asObservable();

  shareCategoryNew(data: any) {
    this.share_category_new.next(data);
  }

  private share_view_pdf = new BehaviorSubject<any>(undefined);
  share_view_pdf_data = this.share_view_pdf.asObservable();

  shareViewPdf(data: any) {
    this.share_view_pdf.next(data);
  }

  private share_view_pdf_userid = new BehaviorSubject<any>(undefined);
  share_view_pdf_userid_data = this.share_view_pdf_userid.asObservable();

  shareViewPdfUserid(data: any) {
    this.share_view_pdf_userid.next(data);
  }

  private share_qrcode_status = new BehaviorSubject<any>(undefined);
  share_qrcode_status_data = this.share_qrcode_status.asObservable();

  shareQrcodeStatus(data: any) {
    this.share_qrcode_status.next(data);
  }

  //check wow wallet data passed
  private check_wow_wallet_data_passed = new BehaviorSubject<any>(undefined);
  check_wow_wallet_data_passed_data =
    this.check_wow_wallet_data_passed.asObservable();

  CheckWowWalletDataPassed(data: any) {
    this.check_wow_wallet_data_passed.next(data);
  }

  //New updated October
  private check_reload_certificate = new BehaviorSubject<any>(undefined);
  check_reload_certificate_data = this.check_reload_certificate.asObservable();

  checkReloadCertificate(data: any) {
    this.check_reload_certificate.next(data);
  }

  //Share popup guidelines video
  private share_Popup_guidelines_id = new BehaviorSubject<any>(undefined);
  share_Popup_guidelines_id_data =
    this.share_Popup_guidelines_id.asObservable();

  sharePopupGuidelinesId(data: any) {
    this.share_Popup_guidelines_id.next(data);
  }

  //Share table data from activity group to list participants
  private sharedatasourcefromactivitytolist = new BehaviorSubject<any>(
    undefined
  );
  sharedatasourcefromactivitytolistdata =
    this.sharedatasourcefromactivitytolist.asObservable();

  sharedatasourcefromactivitytolistData(data: any) {
    this.sharedatasourcefromactivitytolist.next(data);
  }

  //Share table data from schedule to list participants
  private sharedatasourcefromscheduletolist = new BehaviorSubject<any>(
    undefined
  );
  sharedatasourcefromscheduletolistdata =
    this.sharedatasourcefromscheduletolist.asObservable();

  sharedatasourcefromscheduletolistData(data: any) {
    this.sharedatasourcefromscheduletolist.next(data);
  }
  // //Share table data from activity group to list participants
  // private sharescheduledatecolor = new BehaviorSubject<any>(undefined);
  // sharescheduledatecolordata = this.sharescheduledatecolor.asObservable();

  // shareScheduleDateColor(data: any) {
  //   this.sharescheduledatecolor.next(data);
  // }

  private reload_table_bookwow = new BehaviorSubject<any>(undefined);
  reload_table_bookwow_data = this.reload_table_bookwow.asObservable();

  reloadTableBookwowFunction(data: any) {
    this.reload_table_bookwow.next(data);
  }

  private reload_table_bookvol = new BehaviorSubject<any>(undefined);
  reload_table_bookvol_data = this.reload_table_bookvol.asObservable();

  reloadTableBookvolFunction(data: any) {
    this.reload_table_bookvol.next(data);
  }

  private reload_table_actitable = new BehaviorSubject<any>(undefined);
  reload_table_actitable_data = this.reload_table_actitable.asObservable();

  reloadTableActiTableFunction(data: any) {
    this.reload_table_actitable.next(data);
  }

  private make_null_allfromactivitytoschedule = new BehaviorSubject<any>(undefined);
  make_null_allfromactivitytoschedule_data = this.make_null_allfromactivitytoschedule.asObservable();

  makeNullActivitytoSchedule(data: any) {
    this.make_null_allfromactivitytoschedule.next(data);
  }


  
  private make_null_allfromscheduletoactivity = new BehaviorSubject<any>(undefined);
  make_null_allfromscheduletoactivity_data = this.make_null_allfromscheduletoactivity.asObservable();

  makeNullScheduletoActivity(data: any) {
    this.make_null_allfromscheduletoactivity.next(data);
  }
}
