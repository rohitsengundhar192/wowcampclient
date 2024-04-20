import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { WowCampScreenComponent } from './wow-camp-screen/wow-camp-screen.component';
import { WowCampRoutingModule } from './wow-camp-routing.module';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { GetWowCampGuidelinesComponent } from './get-wow-camp-guidelines/get-wow-camp-guidelines.component';
import { PopupcomponentComponent } from './popupcomponent/popupcomponent.component';
import { PopupComponent } from './popup/popup.component';
import { FilterPipe } from 'src/app/shared/pipes/filter/filter.pipe';
import { PopupvolunteerComponent } from './popup/popupvolunteer/popupvolunteer.component';
import { PopupauthorizerComponent } from './popup/popupauthorizer/popupauthorizer.component';
import { AuditTrailTableComponent } from './audit-trail-table/audit-trail-table.component';
import { AuditTrailDialogComponent } from 'src/app/shared/dialogs/audit-trail-dialog/audit-trail-dialog/audit-trail-dialog.component';
import { CampSiteActivitiesUpdatedComponent } from './Updated Component/camp-site-activities-updated/camp-site-activities-updated.component';
import { TravelDirectionUpdatedComponent } from './Updated Component/travel-direction-updated/travel-direction-updated.component';
import { CampParticipaionWavierFormUpdatedComponent } from './Updated Component/camp-participaion-wavier-form-updated/camp-participaion-wavier-form-updated.component';
import { DownloadUnsignedFormUpdatedComponent } from './Updated Component/camp-participaion-wavier-form-updated/download-unsigned-form-updated/download-unsigned-form-updated.component';
import { UploadSinedFormUpdatedComponent } from './Updated Component/camp-participaion-wavier-form-updated/upload-sined-form-updated/upload-sined-form-updated.component';
import { ScheduleCampUpdatedComponent } from './Updated Component/schedule-camp-updated/schedule-camp-updated.component';
import { DeleteActivityUpdatedComponent } from './Updated Component/schedule-camp-updated/delete-activity-updated/delete-activity-updated.component';
import { ActivityCertificateUpdatedComponent } from './Updated Component/activity-certificate-updated/activity-certificate-updated.component';
import { BookCampTicketsUpdatedComponent } from './Updated Component/book-camp-tickets-updated/book-camp-tickets-updated.component';
import { BookEntryTicketsUpdatedComponent } from './Updated Component/book-camp-tickets-updated/book-entry-tickets-updated/book-entry-tickets-updated.component';
import { ReviewBookTicketsUpdatedComponent } from './Updated Component/book-camp-tickets-updated/review-book-tickets-updated/review-book-tickets-updated.component';
import { IframeComponent } from './Updated Component/book-camp-tickets-updated/iframe/iframe.component';
import { MapLeafletComponent } from './map-leaflet/map-leaflet.component';
import { LoginRestrictionComponent } from 'src/app/shared/dialogs/login-restriction/login-restriction.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { WowWalletComponent } from './wow-wallet/wow-wallet.component';
import { GetWalletComponent } from './get-wallet/get-wallet.component';

import { ViewPdfComponent } from './Updated Component/camp-participaion-wavier-form-updated/view-pdf/view-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ActivityCertificateShareComponent } from './Updated Component/activity-certificate-share/activity-certificate-share.component';
import { QRCodeModule } from 'angularx-qrcode';
import { WowcampVideoPopupComponent } from 'src/app/shared/dialogs/wowcamp-video-popup/wowcamp-video-popup.component';
import { BookVolTicketComponent } from './Updated Component/book-camp-tickets-updated/book-vol-ticket/book-vol-ticket.component';
import { ActivityGroupsComponent } from './Updated Component/schedule-camp-updated/activity-groups/activity-groups.component';
import { ScheduleTripsComponent } from './Updated Component/schedule-camp-updated/schedule-trips/schedule-trips.component';
import { ListParticipantsComponent } from './Updated Component/schedule-camp-updated/list-participants/list-participants.component';
import { ListParticipantsScheduleComponent } from './Updated Component/schedule-camp-updated/list-participants-schedule/list-participants-schedule.component';
import { PopupScheduleComponent } from './Updated Component/schedule-camp-updated/popup-schedule/popup-schedule.component';
import { PopupRescheduleComponent } from './Updated Component/schedule-camp-updated/popup-reschedule/popup-reschedule.component';
import { AddNewActivityComponent } from './Updated Component/schedule-camp-updated/add-new-activity/add-new-activity.component';
import { TestingComponent } from './Updated Component/testing/testing.component';
import { WowWasteVideoComponent } from './popup/wow-waste-video/wow-waste-video.component';

@NgModule({
  declarations: [
    WowCampScreenComponent,
    VideoPlayerComponent,
    GetWowCampGuidelinesComponent,
    PopupcomponentComponent,
    PopupComponent,
    FilterPipe,
    PopupvolunteerComponent,
    PopupauthorizerComponent,
    IframeComponent,

    AuditTrailTableComponent,
    AuditTrailDialogComponent,
    CampSiteActivitiesUpdatedComponent,
    TravelDirectionUpdatedComponent,
    CampParticipaionWavierFormUpdatedComponent,
    DownloadUnsignedFormUpdatedComponent,
    UploadSinedFormUpdatedComponent,
    ScheduleCampUpdatedComponent,
    DeleteActivityUpdatedComponent,
    ActivityCertificateUpdatedComponent,
    BookCampTicketsUpdatedComponent,
    BookEntryTicketsUpdatedComponent,
    ReviewBookTicketsUpdatedComponent,
    MapLeafletComponent,

    LoginRestrictionComponent,
    WowcampVideoPopupComponent,
    WowWalletComponent,
    GetWalletComponent,

    ViewPdfComponent,

    ActivityCertificateShareComponent,
    BookVolTicketComponent,
    ActivityGroupsComponent,
    ScheduleTripsComponent,
    ListParticipantsComponent,
    ActivityCertificateUpdatedComponent,
    ListParticipantsScheduleComponent,
    PopupScheduleComponent,
    PopupRescheduleComponent,
    AddNewActivityComponent,
    TestingComponent,
    WowWasteVideoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WowCampRoutingModule,
    CKEditorModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    NgxQRCodeModule,
    QRCodeModule,
  ],
})
export class WowCampModule {}
