import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  starsCount1 = 0;
  patientList = new MatTableDataSource<any>();
  displayedColumns: string[] = ['#', 'name', 'dob', 'mtm', 'cmr', 'rating', 'risk', 'interaction'];
  // dataSource = new MatTableDataSource<any>(this.patientList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private patientService: PatientService) {

    let patients = new Promise((resolve, rej) => {
      this.patientService.getPatientList().subscribe(
        res => {
          console.log(res)
          this.patientList = res;
          resolve(true);
        }
      );
    });

    patients.then(() => {
      this.patientList.paginator = this.paginator;
    })
  }

  ngOnInit() {
  }

}
