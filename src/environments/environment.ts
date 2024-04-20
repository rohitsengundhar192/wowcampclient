// const baseURL_2 = 'https://cephapi.getster.tech/api/';
const baseURL_2 = 'https://cephapi.getwow.biz/api/';
const baseURL = 'http://localhost:3000/api/';
// const baseURL = 'https://u26api.getwow.community/api/';
// const baseURL = 'https://u26api.getwow.education/api/';
const cephTest = 'https://u5api.getwow.community/api/';
const cephProd = 'https://u5api.getwow.education/api/';

export const environment = {
  production: false,
  baseURL: '',
  // Map
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiYnJhc2thbSIsImEiOiJja3NqcXBzbWoyZ3ZvMm5ybzA4N2dzaDR6In0.RUAYJFnNgOnn80wXkrV9ZA',
  },

  // wow_wallet_pop_up: "https://p28.getwow.community",
  // get_wallet_pop_up: "https://p27.getwow.community",

  payment_options_india: 'https://p50.getwow.community',
  // payment_options_india:'https://p50.getwow.education',

  form: 'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/simple-form',
  address_form:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/address-form',
  stepper_form:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/stepper-form',
  audit_trail:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/audit-trail',
  pagination_table:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/table-pagination',

  add_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/tree-view/add-category',
  get_categories:
    'https://apitemplate.getbiz.app/api/template-getbiz/tree-view/get-all-categories',
  update_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/tree-view/update-category',
  hide_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/tree-view/hide-category',

  assign_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/assign-category',
  update_assigned_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/update-assigned-category',
  check_user_is_assigned_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/check-user-is-assigned-category',
  get_users:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/get-users',
  get_users_category_id:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/get-users-by-category-id',
  get_assigned_category:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/get-assign-category',
  passingUsersParentToChild:
    'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/passing-users-from-parent-to-child',
  postUtcCurrentTimestampBasedOnTimeZoneIanaString: `https://apitemplate.getbiz.app/api/template-getbiz/form-controller/post-utc-current-timestamp-based-on-time-zone-iana-string`,

  //Mine Api's

  //CampSites and Activities & Travel Directions
  NearestCampSite:
    baseURL + 'campsites-master/get-nearest-camp-Site-by-camp-id',
  getNearestlocation:
    baseURL + 'campsites-master/get-nearest-location-data-by-camp-id',
  activityvideo:
    baseURL + 'campsites-master/get-activity-video-data-by-camp-id',
  datajson: baseURL + 'campsites-master/get-data-json-data-by-camp-id',
  ticketdatajson:
    baseURL + 'campsites-master/get-data-json-data-ticket-details',
  camp_video: baseURL + 'campsites-master/get-camp-video-data-by-camp-id',
  camp_video_guidelines:
    baseURL + 'campsites-master/get-camp-video-data-by-camp-id-guidelines',
  activityName: baseURL + 'campsites-master/get-activity-name-data-by-camp-id',

  //Travel Direction
  NearestCampSitetr:
    baseURL + 'campsites-master/get-nearest-camp-Site-tr-by-camp-id',
  getNearestlocationtr:
    baseURL + 'campsites-master/get-nearest-location-data-tr-by-camp-id',
  datajsontr: baseURL + 'campsites-master/get-data-json-data-tr-by-camp-id',

  //Activity Certificate Download
  parent_child_select:
    baseURL + 'parent-student-linkage/get-selected-studentonly-by-user-id',
  student_data:
    baseURL + 'parent-student-linkage/get-table-details-by-user-id-certificate',
  activityCertificatedata:
    baseURL + 'parent-student-linkage/get-data-json-activity-certifiate',
  first_stu:
    baseURL + 'parent-student-linkage/get-user-name-birth-date-by-user-id',
  ClassOneToEightUrl:
    baseURL + 'parent-student-linkage/get-nine-to-twelve-colors-url',
  decryptCode: baseURL + 'parent-student-linkage/on-decrypt-encoded',

  institutiondata:
    baseURL + 'parent-student-linkage/get-customer-details-by-customer-id',

  selected_stu: baseURL + 'parent-student-linkage/login-info',

  //Audit Trail
  AuditTrail:
    baseURL +
    'audit-trail-for-getwow-camp/get-getwowcamp-audit-trail-download-forms',
  AuditTrailbook:
    baseURL +
    'audit-trail-for-getwow-camp/get-getwowcamp-audit-trail-book-camp-ticket',
  AuditTrailSchdeule:
    baseURL + 'audit-trail-for-getwow-camp/get-getwowcamp-audit-trail-schedule',

  //camp participation Approval and wavier form
  selectCategory:
    baseURL + 'camp-participation-and-wavier-form/get-category-names',
  selectCategorypopup:
    baseURL + 'camp-participation-and-wavier-form/get-category-names-popups',
    selectCategorypopuphod:
    baseURL + 'camp-participation-and-wavier-form/get-category-names-popups-hod',
  selectCategorynormal:
    baseURL + 'camp-participation-and-wavier-form/get-category-names-normal',
  datadisplay: baseURL + 'camp-participation-and-wavier-form/get-data-display',
  data_table_two:
    baseURL + 'camp-participation-and-wavier-form/get-data-to-display',
  data_table_not_display:
    baseURL + 'camp-participation-and-wavier-form/get-data-not-to-display',
  addParticipants:
    baseURL +
    'camp-participation-and-wavier-form/insert-add-selected-users-by-user-id',

  authorizerTodisplay:
    baseURL + 'camp-participation-and-wavier-form/get-authorizer-To-display',
  addAuthorizer:
    baseURL +
    'camp-participation-and-wavier-form/update-add-authorizer-by-user-id',
  downloadDateTime:
    baseURL +
    'camp-participation-and-wavier-form/update-download-Date-Time-by-user-id',

  ins_data: baseURL + 'camp-participation-and-wavier-form/get-institution-data',

  updateuploadform:
    baseURL + 'camp-participation-and-wavier-form/update-signed-form',
  updateeditparticipants:
    baseURL + 'camp-participation-and-wavier-form/update-edit-participants',

  //Book Camp Sites
  NearestCampSiteTickets:
    baseURL + 'customer-camp-booking-data/get-nearest-camp-site-by-camp-id',
  NearestCampSiteTicketscampid:
    baseURL + 'customer-camp-booking-data/get-nearest_camp_site_campid',
  getNearestlocationTickets:
    baseURL + 'customer-camp-booking-data/get-nearest-location-site',
  selectCategoryTickets:
    baseURL + 'customer-camp-booking-data/get-category-names',
  data_tableTickets: baseURL + 'customer-camp-booking-data/get-data-to-display',
  gettablebookvolunteer:
    baseURL + 'customer-camp-booking-data/get-data-to-display-volunteer',
  BookwowTicket: baseURL + 'customer-camp-booking-data/get-book-wow-ticket',
  BookwowTicketUpdate:
    baseURL + 'customer-camp-booking-data/insert-book-wow-ticket',

  BookgetTicket: baseURL + 'customer-camp-booking-data/get-book-get-ticket',
  BookgetTicketUpdate:
    baseURL + 'customer-camp-booking-data/insert-book-get-ticket',
  BookvolunteerTicket:
    baseURL + 'customer-camp-booking-data/get-book-volunteer-ticket',
  BookvolunteerTicketUpdate:
    baseURL + 'customer-camp-booking-data/insert-book-volunteer-ticket',

  reviewcancelticketsdisplay:
    baseURL + 'customer-camp-booking-data/get-review-cancel-tickets-display',
  reviewcancelticketsdisplayupdate:
    baseURL + 'customer-camp-booking-data/update-review-cancel-ticket',

  //Schedule camp trip and activities

  //Schedule camp trip and activities

  nearcampschedule:
    baseURL + 'campid-booking-data/get-near-camp-schedule-by-camp-id',
  nearcampreschedule:
    baseURL + 'campid-booking-data/get-near-camp-reschedule-by-camp-id',
  activitygroupdisplay:
    baseURL + 'campid-booking-data/get-activity-group-display-by-camp-id',
  activitygroupinsert:
    baseURL + 'campid-booking-data/insert-activity-group-button',
  selectactivity: baseURL + 'campid-booking-data/get-select-activity',
  deleteactivitygroupdisplay:
    baseURL + 'campid-booking-data/get-delete-activity-group-display',
  deleteactivitygroupdupdate:
    baseURL + 'campid-booking-data/update-activity-cancel-ticket',
  sechduleselectactivity:
    baseURL + 'campid-booking-data/get-sechedule-select-activity',
  schedulegroupdisplay:
    baseURL + 'campid-booking-data/get-sechdeule-group-display',
  resechduleselectactivity:
    baseURL + 'campid-booking-data/get-resechedule-select-activity',
  reschedulegroupdisplay:
    baseURL + 'campid-booking-data/get-resechdeule-group-display',

  getcalenderdatanew:
    baseURL + 'campid-booking-data/get-calender-data-availability-color',
  calenderAvailability:
    baseURL + 'campid-booking-data/get-calender-availability',
  scheduletripupdate: baseURL + 'campid-booking-data/update-schedule-trip',
  rescheduletripupdate: baseURL + 'campid-booking-data/update-reschedule-trip',
  addparticipantsupdate:
    baseURL + 'camp-participation-and-wavier-form/get-data-add-participants',
  addparticipantsupdateedit:
    baseURL +
    'camp-participation-and-wavier-form/get-data-add-participants-edit',
  addvolunteerupdate:
    baseURL + 'camp-participation-and-wavier-form/get-data-add-volunteer',
  addauthorizerupdate:
    baseURL + 'camp-participation-and-wavier-form/get-data-add-authorizer',
  savepartcipants:
    baseURL + 'camp-participation-and-wavier-form/insert-add-users',
  delete_file: baseURL + 'camp-participation-and-wavier-form/delete-global-id',
  createTable: baseURL + 'campsites-master/get-create-table',
  getactivitygrouptable:
    baseURL + 'customer-camp-booking-data/get-activity-group-table',
  getscheduletriptable:
    baseURL + 'customer-camp-booking-data/get-schedule-trip-table',
  sechdeuleTriplistdisplay:
    baseURL + 'customer-camp-booking-data/get-sechdeule-trip-list-display',
  // ------------------------------- CEPH Storage -----------------
  create_file: cephTest + 'files-master/file-upload-throw-other-customer-apps',
  update_file: baseURL_2 + 'storage-for-customers/update-file',

  get_file: baseURL_2 + 'storage-for-customers/get-file',
  get_file_multiple_files_based_on_key:
    baseURL_2 + 'storage-for-customers/get-file-multiple-files-based-on-key',
  delete_file_ceph: baseURL_2 + 'storage-for-customers/delete-file',

  ceph_URL: 'https://cephapi.getster.tech/api/storage/',
  ceph_URL_test: 'https://cephapi.getwow.biz/api/storage/',
  get_file_manage: baseURL_2 + 'storage-for-education-management/get-file',
  get_file_multiple_files_based_on_key_manage:
    baseURL_2 +
    'storage-for-education-management/get-file-multiple-files-based-on-key',

  wow_waste_guidelines_popup: 'https://p53.getwow.community',
};
