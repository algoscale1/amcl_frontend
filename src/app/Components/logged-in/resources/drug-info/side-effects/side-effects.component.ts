import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DrugInfoComponent } from '../drug-info.component';

@Component({
  selector: 'app-side-effects',
  templateUrl: './side-effects.component.html',
  styleUrls: ['./side-effects.component.css']
})
export class SideEffectsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DrugInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
