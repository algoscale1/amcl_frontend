import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-med-review',
  templateUrl: './med-review.component.html',
  styleUrls: ['./med-review.component.css']
})
export class MedReviewComponent implements OnInit {

  patientList = [];
  displayedColumns: string[] = ['name'];

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {

    this.patientService.getPatientList().subscribe(
      res => {
        this.patientList = res;
      }
    )
  }

  patientDetail(id) {
    this.router.navigate([`/review/${id}`]);
  }

}
