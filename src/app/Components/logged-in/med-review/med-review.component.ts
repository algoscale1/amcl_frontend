import { Component, OnInit } from '@angular/core';

import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-med-review',
  templateUrl: './med-review.component.html',
  styleUrls: ['./med-review.component.css']
})
export class MedReviewComponent implements OnInit {

  patientList = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {

    this.patientService.getPatientList().subscribe(
      res => {
        this.patientList = res;
      }
    )
  }

}
