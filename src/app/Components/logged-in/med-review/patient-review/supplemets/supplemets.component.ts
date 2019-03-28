import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PatientReviewComponent } from '../patient-review.component';

@Component({
  selector: 'app-supplemets',
  templateUrl: './supplemets.component.html',
  styleUrls: ['./supplemets.component.css']
})
export class SupplemetsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PatientReviewComponent>, @Inject(MAT_DIALOG_DATA) public question: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
