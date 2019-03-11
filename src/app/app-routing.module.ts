import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './Authentication/auth.guard';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoggedInComponent } from './Components/logged-in/logged-in.component';
import { CommunityComponent } from './Components/logged-in/community/community.component';
import { AddPatientComponent } from './Components/logged-in/add-patient/add-patient.component';
import { MedReviewComponent } from './Components/logged-in/med-review/med-review.component';
import { ResourcesComponent } from './Components/logged-in/resources/resources.component';
import { GenerateReportComponent } from './Components/logged-in/med-review/generate-report/generate-report.component';
import { AccountComponent } from './Components/logged-in/account/account.component';
import { PatientReviewComponent } from './Components/logged-in/med-review/patient-review/patient-review.component';

const routes: Routes = [
  { path: '', redirectTo: 'logIn', pathMatch: 'full' },
  { path: 'logIn', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: LoggedInComponent, children: [
      { path: 'community', component: CommunityComponent },
      { path: 'add_patient', component: AddPatientComponent },
      {
        path: 'review_list', component: MedReviewComponent, children: [
          { path: 'generate_report', component: GenerateReportComponent }
        ]
      },
      { path: 'review/:id', component: PatientReviewComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'account', component: AccountComponent }
    ], canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
