import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { LoginComponent } from './dialogs/login/login.component';
import { NoInternetComponent } from './dialogs/no-internet/no-internet.component';
import { AddAllToPaginator } from './directives/add-all-to-paginator/add-all-to-paginator.directive';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { UserProfileCardComponent } from './dialogs/user-profile-card/user-profile-card.component';

const BASE_MODULES = [FormsModule, ReactiveFormsModule, MaterialModule];

export const MY_NATIVE_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const Guards = [UnsavedChangesGuard];

const Pipes = [EllipsisPipe, NoSanitizePipe];

const Directives: any[] = [AddAllToPaginator];

@NgModule({
  declarations: [
    Pipes,
    Directives,
    LoginComponent,
    SpinnerComponent,
    NoInternetComponent,
    UserProfileCardComponent,
  ],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [
    Guards,
    { provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
