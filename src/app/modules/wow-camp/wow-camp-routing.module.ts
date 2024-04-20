import { GetWowCampGuidelinesComponent } from './get-wow-camp-guidelines/get-wow-camp-guidelines.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WowCampScreenComponent } from './wow-camp-screen/wow-camp-screen.component';
import { CampSiteActivitiesUpdatedComponent } from './Updated Component/camp-site-activities-updated/camp-site-activities-updated.component';
import { TravelDirectionUpdatedComponent } from './Updated Component/travel-direction-updated/travel-direction-updated.component';
import { CampParticipaionWavierFormUpdatedComponent } from './Updated Component/camp-participaion-wavier-form-updated/camp-participaion-wavier-form-updated.component';
import { ScheduleCampUpdatedComponent } from './Updated Component/schedule-camp-updated/schedule-camp-updated.component';
import { ActivityCertificateUpdatedComponent } from './Updated Component/activity-certificate-updated/activity-certificate-updated.component';
import { BookCampTicketsUpdatedComponent } from './Updated Component/book-camp-tickets-updated/book-camp-tickets-updated.component';
import { TestingComponent } from './Updated Component/testing/testing.component';

const routes: Routes = [
  { path: '', redirectTo: 'wow-camp-screen', pathMatch: 'full' },
  {
    path: 'wow-camp-screen',
    component: WowCampScreenComponent,
    children: [
      {
        path: '',
        redirectTo: 'get-wow-camp-guidelines',
        pathMatch: 'full',
      },
      {
        path: 'get-wow-camp-guidelines',
        component: GetWowCampGuidelinesComponent,
      },
      {
        path: 'camp-site-activities-updated',
        component: CampSiteActivitiesUpdatedComponent,
      },

      {
        path: 'travel-direction-updated',
        component: TravelDirectionUpdatedComponent,
      },
      {
        path: 'camp-participaion-wavier-form-updated',
        component: CampParticipaionWavierFormUpdatedComponent,
      },
      {
        path: 'schedule-camp-updated',
        component: ScheduleCampUpdatedComponent,
      },

      {
        path: 'activity-certificate-updated',
        component: ActivityCertificateUpdatedComponent,
      },

      {
        path: 'book-camp-tickets-updated',
        component: BookCampTicketsUpdatedComponent,
      },

      {
        path: 'testing',
        component: TestingComponent,
      },

      // {
      //   path: 'activity-certificate-share',
      //   component: ActivityCertificateShareComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WowCampRoutingModule {}
