import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ActivityCertificateShareComponent } from '../modules/wow-camp/Updated Component/activity-certificate-share/activity-certificate-share.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/wow-camp/wow-camp.module').then(
            (m) => m.WowCampModule
          ),
      },
      {
        path: 'activity-certificate-share',
        component: ActivityCertificateShareComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
