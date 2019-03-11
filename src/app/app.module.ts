import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from "ngx-rating";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);

import { MaterialModule } from './Angular Material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './Components/register/register.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { LoggedInComponent } from './Components/logged-in/logged-in.component';
import { HeaderComponent } from './Components/logged-in/Shared/header/header.component';
import { AddPatientComponent } from './Components/logged-in/add-patient/add-patient.component';
import { CommunityComponent } from './Components/logged-in/community/community.component';
import { MedReviewComponent } from './Components/logged-in/med-review/med-review.component';
import { GenerateReportComponent } from './Components/logged-in/med-review/generate-report/generate-report.component';
import { ReviewDrugsComponent } from './Components/logged-in/med-review/review-drugs/review-drugs.component';
import { ConfirmationDialogComponent } from './Components/logged-in/med-review/confirmation-dialog/confirmation-dialog.component';
import { ResourcesComponent } from './Components/logged-in/resources/resources.component';
import { DrugInfoComponent } from './Components/logged-in/resources/drug-info/drug-info.component';
import { SideEffectsComponent } from './Components/logged-in/resources/drug-info/side-effects/side-effects.component';
import { DrugInteractionComponent } from './Components/logged-in/resources/drug-interaction/drug-interaction.component';
import { DrugSubstitutionComponent } from './Components/logged-in/resources/drug-substitution/drug-substitution.component';
import { FoodInteractionComponent } from './Components/logged-in/resources/food-interaction/food-interaction.component';
import { ErrorComponent } from './Components/log-in/error/error.component';
import { AccountComponent } from './Components/logged-in/account/account.component';
import { PatientReviewComponent } from './Components/logged-in/med-review/patient-review/patient-review.component';
import { TokenInterceptor } from './Authentication/interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    LoggedInComponent,
    HeaderComponent,
    AddPatientComponent,
    CommunityComponent,
    MedReviewComponent,
    GenerateReportComponent,
    ReviewDrugsComponent,
    ConfirmationDialogComponent,
    ResourcesComponent,
    DrugInfoComponent,
    SideEffectsComponent,
    DrugInteractionComponent,
    DrugSubstitutionComponent,
    FoodInteractionComponent,
    ErrorComponent,
    AccountComponent,
    PatientReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RatingModule,
    FusionChartsModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "showSubtitle": false,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
